-- ==========================================================================
-- AGIR FinTech - Supabase Schema & FX Investment Pipeline (Phase 3)
-- ==========================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Currency Rates Table (FX Rates relative to XAF)
CREATE TABLE IF NOT EXISTS public.currency_rates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    currency_code VARCHAR(3) UNIQUE NOT NULL, -- e.g., 'USD', 'EUR', 'NGN'
    currency_name VARCHAR(50) NOT NULL,       -- e.g., 'US Dollar', 'Euro'
    flag_emoji VARCHAR(4) NOT NULL,           -- e.g., '🇺🇸', '🇪🇺', '🇨🇲'
    rate_to_xaf NUMERIC(12, 4) NOT NULL,      -- How much XAF (FCFA) for 1 unit of this currency
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) for currency rates
ALTER TABLE public.currency_rates ENABLE ROW LEVEL SECURITY;

-- Read-only policy for anonymous users
CREATE POLICY "Allow public read access to currency rates" 
    ON public.currency_rates FOR SELECT 
    USING (true);

-- 3. User Profiles (Extending Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(100) NOT NULL,
    cash_balance_xaf NUMERIC(15, 2) DEFAULT 0.00 NOT NULL,
    transaction_pin VARCHAR(4) DEFAULT '0000' NOT NULL,
    risk_profile VARCHAR(20) DEFAULT 'Non Défini' NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to read their own profile" 
    ON public.user_profiles FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY "Allow users to update their own profile" 
    ON public.user_profiles FOR UPDATE 
    USING (auth.uid() = id);

-- 4. User Investments Portfolio
CREATE TABLE IF NOT EXISTS public.investments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
    ticker VARCHAR(10) NOT NULL,
    quantity INTEGER CHECK (quantity > 0) NOT NULL,
    avg_buy_price_xaf NUMERIC(15, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, ticker)
);

ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to view their own investments" 
    ON public.investments FOR SELECT 
    USING (auth.uid() = user_id);

-- 5. Unified Transaction Logs (Supports Multi-Currency Deposits and Orders)
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
    type VARCHAR(20) CHECK (type IN ('deposit', 'withdrawal', 'buy', 'sell')) NOT NULL,
    ticker VARCHAR(10), -- NULL for deposits/withdrawals
    amount_local NUMERIC(15, 2) NOT NULL,
    currency_code VARCHAR(3) NOT NULL,
    exchange_rate NUMERIC(12, 4) NOT NULL,
    amount_xaf NUMERIC(15, 2) NOT NULL,
    payment_gateway VARCHAR(30) NOT NULL, -- 'GIMAC', 'CinetPay', 'Stripe', 'Flutterwave'
    status VARCHAR(20) DEFAULT 'success' CHECK (status IN ('pending', 'success', 'failed')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to view their own transactions" 
    ON public.transactions FOR SELECT 
    USING (auth.uid() = user_id);

-- ==========================================================================
-- Seed Data: Initial FX Rates
-- ==========================================================================
INSERT INTO public.currency_rates (currency_code, currency_name, flag_emoji, rate_to_xaf) VALUES
('XAF', 'Franc CFA (CEMAC)', '🇨🇲', 1.0000),      -- Cameroon, Gabon, Congo, Chad, CAR, Equatorial Guinea
('EUR', 'Euro', '🇪🇺', 655.9570),                  -- Fixed Peg
('USD', 'US Dollar', '🇺🇸', 605.5000),             -- International
('GBP', 'British Pound', '🇬🇧', 770.2000),          -- International
('NGN', 'Nigerian Naira', '🇳🇬', 0.4000),          -- Panafrican
('ZAR', 'South African Rand', '🇿🇦', 32.5000),      -- Panafrican
('KES', 'Kenyan Shilling', '🇰🇪', 4.7000)           -- Panafrican
ON CONFLICT (currency_code) DO UPDATE 
SET rate_to_xaf = EXCLUDED.rate_to_xaf, updated_at = now();

-- ==========================================================================
-- SQL Functions / Stored Procedures for FX Investment Validation
-- ==========================================================================

-- Function to convert local currency and buy assets at BVMAC
CREATE OR REPLACE FUNCTION public.convert_and_invest(
    p_user_id UUID,
    p_ticker VARCHAR(10),
    p_qty INTEGER,
    p_asset_price_xaf NUMERIC(15, 2),
    p_amount_local NUMERIC(15, 2),
    p_currency_code VARCHAR(3),
    p_transaction_pin VARCHAR(4)
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER -- Runs with elevated privileges to check PIN and update balances
AS $$
DECLARE
    v_actual_pin VARCHAR(4);
    v_rate NUMERIC(12, 4);
    v_total_cost_xaf NUMERIC(15, 2);
    v_converted_cost_local NUMERIC(15, 2);
    v_current_cash NUMERIC(15, 2);
    v_response JSONB;
BEGIN
    -- 1. Verify User PIN
    SELECT transaction_pin, cash_balance_xaf INTO v_actual_pin, v_current_cash 
    FROM public.user_profiles 
    WHERE id = p_user_id;

    IF v_actual_pin IS NULL OR v_actual_pin <> p_transaction_pin THEN
        RETURN jsonb_build_object('success', false, 'error', 'Code PIN de transaction incorrect.');
    END IF;

    -- 2. Fetch locked FX rate
    SELECT rate_to_xaf INTO v_rate 
    FROM public.currency_rates 
    WHERE currency_code = p_currency_code;

    IF v_rate IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Devise non supportée par le marché.');
    END IF;

    -- 3. Calculate costs
    v_total_cost_xaf := p_qty * p_asset_price_xaf;
    v_converted_cost_local := v_total_cost_xaf / v_rate;

    -- 4. Check funds
    IF v_current_cash < v_total_cost_xaf THEN
        RETURN jsonb_build_object('success', false, 'error', 'Solde insuffisant pour couvrir cet achat.');
    END IF;

    -- 5. Deduct Cash
    UPDATE public.user_profiles 
    SET cash_balance_xaf = cash_balance_xaf - v_total_cost_xaf
    WHERE id = p_user_id;

    -- 6. Add/Update Holdings in Portfolio
    INSERT INTO public.investments (user_id, ticker, quantity, avg_buy_price_xaf)
    VALUES (p_user_id, p_ticker, p_qty, p_asset_price_xaf)
    ON CONFLICT (user_id, ticker) DO UPDATE
    SET 
        avg_buy_price_xaf = ROUND(((public.investments.quantity * public.investments.avg_buy_price_xaf) + v_total_cost_xaf) / (public.investments.quantity + p_qty), 2),
        quantity = public.investments.quantity + p_qty;

    -- 7. Log Transaction
    INSERT INTO public.transactions (user_id, type, ticker, amount_local, currency_code, exchange_rate, amount_xaf, payment_gateway, status)
    VALUES (p_user_id, 'buy', p_ticker, v_converted_cost_local, p_currency_code, v_rate, v_total_cost_xaf, 'Supabase SQL Engine', 'success');

    -- 8. Build success output
    v_response := jsonb_build_object(
        'success', true,
        'ticker', p_ticker,
        'qty', p_qty,
        'cost_xaf', v_total_cost_xaf,
        'cost_local', ROUND(v_converted_cost_local, 2),
        'fx_rate', v_rate
    );

    RETURN v_response;
EXCEPTION
    WHEN OTHERS THEN
        RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;
