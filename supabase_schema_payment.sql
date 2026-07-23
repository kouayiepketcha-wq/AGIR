-- ==========================================================================
-- AGIR FinTech - Schema Updates for Payment Integration & Compliance (Phase 4)
-- ==========================================================================

-- 1. Alter user_profiles to support KYC statuses and limits
ALTER TABLE public.user_profiles 
    ADD COLUMN IF NOT EXISTS kyc_status VARCHAR(20) DEFAULT 'unverified' CHECK (kyc_status IN ('unverified', 'pending', 'verified')) NOT NULL,
    ADD COLUMN IF NOT EXISTS kyc_document_url TEXT,
    ADD COLUMN IF NOT EXISTS limit_daily_xaf NUMERIC(15, 2) DEFAULT 1000000.00 NOT NULL,
    ADD COLUMN IF NOT EXISTS limit_monthly_xaf NUMERIC(15, 2) DEFAULT 10000000.00 NOT NULL;

-- 2. Alter transactions to support idempotency keys and expanded states
ALTER TABLE public.transactions 
    ADD COLUMN IF NOT EXISTS idempotency_key VARCHAR(100) UNIQUE;

-- Modify constraint to support 'processing' and 'expired' states
ALTER TABLE public.transactions DROP CONSTRAINT IF EXISTS transactions_status_check;
ALTER TABLE public.transactions ADD CONSTRAINT transactions_status_check CHECK (status IN ('pending', 'processing', 'success', 'failed', 'expired'));

-- 3. Create Immutable Payment Audit Logs Table
CREATE TABLE IF NOT EXISTS public.payment_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE RESTRICT NOT NULL,
    transaction_id UUID REFERENCES public.transactions(id) ON DELETE RESTRICT,
    action VARCHAR(50) NOT NULL, -- 'kyc_submitted', 'kyc_approved', 'deposit_init', 'deposit_success', 'withdrawal_init', 'withdrawal_success'
    amount_xaf NUMERIC(15, 2),
    details TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Audit logs
ALTER TABLE public.payment_audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to read their own audit logs" 
    ON public.payment_audit_logs FOR SELECT 
    USING (auth.uid() = user_id);

-- Trigger to make Audit Logs immutable (reject any UPDATE or DELETE)
CREATE OR REPLACE FUNCTION public.block_audit_log_modifications()
RETURNS TRIGGER 
LANGUAGE plpgsql
AS $$
BEGIN
    RAISE EXCEPTION 'Conformité COBAC: Les journaux d''audit de paiement sont immuables et ne peuvent pas être modifiés ou supprimés.';
END;
$$;

DROP TRIGGER IF EXISTS audit_logs_immutable_trigger ON public.payment_audit_logs;
CREATE TRIGGER audit_logs_immutable_trigger
    BEFORE UPDATE OR DELETE ON public.payment_audit_logs
    FOR EACH ROW EXECUTE FUNCTION public.block_audit_log_modifications();

-- 4. SQL Function to validate transaction limits before execution
CREATE OR REPLACE FUNCTION public.check_user_transaction_limits(
    p_user_id UUID,
    p_amount_xaf NUMERIC(15, 2)
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_daily_limit NUMERIC(15, 2);
    v_monthly_limit NUMERIC(15, 2);
    v_daily_spent NUMERIC(15, 2);
    v_monthly_spent NUMERIC(15, 2);
    v_kyc VARCHAR(20);
BEGIN
    -- 1. Fetch user limits and KYC status
    SELECT kyc_status, limit_daily_xaf, limit_monthly_xaf
    INTO v_kyc, v_daily_limit, v_monthly_limit
    FROM public.user_profiles
    WHERE id = p_user_id;

    -- 2. Block unverified users
    IF v_kyc = 'unverified' THEN
        RAISE EXCEPTION 'Conformité LCB-FT: Votre compte n''est pas vérifié. Veuillez soumettre vos documents KYC.';
    END IF;

    -- 3. Calculate spent amount today
    SELECT COALESCE(SUM(amount_xaf), 0)
    INTO v_daily_spent
    FROM public.transactions
    WHERE user_id = p_user_id
      AND type IN ('deposit', 'withdrawal')
      AND status = 'success'
      AND created_at >= NOW() - INTERVAL '1 day';

    -- 4. Calculate spent amount this month
    SELECT COALESCE(SUM(amount_xaf), 0)
    INTO v_monthly_spent
    FROM public.transactions
    WHERE user_id = p_user_id
      AND type IN ('deposit', 'withdrawal')
      AND status = 'success'
      AND created_at >= NOW() - INTERVAL '30 days';

    -- 5. Limit pending users to 50 000 FCFA total deposit
    IF v_kyc = 'pending' THEN
        IF (v_daily_spent + p_amount_xaf) > 50000.00 THEN
            RAISE EXCEPTION 'Limite de dépôt temporaire de 50 000 FCFA dépassée pour le statut KYC en attente.';
        END IF;
    END IF;

    -- 6. Check standard limits
    IF (v_daily_spent + p_amount_xaf) > v_daily_limit THEN
        RAISE EXCEPTION 'Limite quotidienne de transaction dépassée (% sur % FCFA)', (v_daily_spent + p_amount_xaf), v_daily_limit;
    END IF;

    IF (v_monthly_spent + p_amount_xaf) > v_monthly_limit THEN
        RAISE EXCEPTION 'Limite mensuelle de transaction dépassée (% sur % FCFA)', (v_monthly_spent + p_amount_xaf), v_monthly_limit;
    END IF;

    RETURN TRUE;
END;
$$;
