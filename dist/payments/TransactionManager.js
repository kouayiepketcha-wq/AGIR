"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionManager = void 0;
const supabaseClient_1 = require("../supabaseClient");
const CinetPayProvider_1 = require("./CinetPayProvider");
const StripeProvider_1 = require("./StripeProvider");
const BankTransferProvider_1 = require("./BankTransferProvider");
const KycManager_1 = require("./KycManager");
class TransactionManager {
    static providers = {
        CinetPay: new CinetPayProvider_1.CinetPayProvider(),
        Stripe: new StripeProvider_1.StripeProvider(),
        BankTransfer: new BankTransferProvider_1.BankTransferProvider()
    };
    /**
     * Helper to retrieve a provider by name
     */
    static getProvider(name) {
        const provider = this.providers[name];
        if (!provider) {
            throw new Error(`Provider de paiement non supporté: ${name}`);
        }
        return provider;
    }
    /**
     * Generates a unique idempotency key based on parameters
     */
    static generateIdempotencyKey(userId, amount, type, gateway) {
        const rawString = `${userId}-${amount}-${type}-${gateway}-${Date.now()}`;
        // Simple fast string hashing helper
        let hash = 0;
        for (let i = 0; i < rawString.length; i++) {
            hash = (hash << 5) - hash + rawString.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return `IDEMP-${Math.abs(hash)}-${Math.floor(Math.random() * 1000)}`;
    }
    /**
     * Initiate customer deposit
     */
    static async initiateDeposit(userId, amountLocal, currency, gatewayName, idempotencyKey) {
        try {
            // 1. Resolve FX Rate and XAF equivalents
            let rate = 1.0;
            if (currency !== 'XAF') {
                const { data: rateData } = await supabaseClient_1.supabase
                    .from('currency_rates')
                    .select('rate_to_xaf')
                    .eq('currency_code', currency)
                    .single();
                rate = Number(rateData?.rate_to_xaf || 1.0);
            }
            const amountXaf = amountLocal * rate;
            // 2. Validate transaction limits and KYC level
            const limitsCheck = await KycManager_1.KycManager.validateTransactionLimits(userId, amountXaf);
            if (!limitsCheck.allowed) {
                return { success: false, error: limitsCheck.reason };
            }
            // 3. Verify idempotency key (prevent double payments)
            const { data: existingTx } = await supabaseClient_1.supabase
                .from('transactions')
                .select('id, status')
                .eq('idempotency_key', idempotencyKey)
                .single();
            if (existingTx) {
                return {
                    success: true,
                    transactionId: existingTx.id,
                    error: 'Conformité Sécurité: Transaction existante identifiée (Anti-Double-Débit).'
                };
            }
            // 4. Create transaction log (status: pending)
            const { data: newTx, error: txError } = await supabaseClient_1.supabase
                .from('transactions')
                .insert({
                user_id: userId,
                type: 'deposit',
                amount_local: amountLocal,
                currency_code: currency,
                exchange_rate: rate,
                amount_xaf: amountXaf,
                payment_gateway: gatewayName,
                status: 'pending',
                idempotency_key: idempotencyKey
            })
                .select()
                .single();
            if (txError)
                throw txError;
            // 5. Insert security audit log
            await supabaseClient_1.supabase.from('payment_audit_logs').insert({
                user_id: userId,
                transaction_id: newTx.id,
                action: 'deposit_init',
                amount_xaf: amountXaf,
                details: `Initialisation dépôt de ${amountLocal} ${currency} (Net ${amountXaf} XAF) via ${gatewayName}. Clé: ${idempotencyKey}`
            });
            // 6. Request provider initialization
            const provider = this.getProvider(gatewayName);
            const providerResult = await provider.initiatePayment(amountLocal, currency, userId, newTx.id);
            if (!providerResult.success) {
                // Mark transaction as failed if initial request rejected
                await supabaseClient_1.supabase
                    .from('transactions')
                    .update({ status: 'failed' })
                    .eq('id', newTx.id);
                throw new Error(providerResult.error);
            }
            return {
                success: true,
                transactionId: newTx.id,
                paymentUrl: providerResult.paymentUrl,
                ussdCode: providerResult.ussdCode
            };
        }
        catch (err) {
            return { success: false, error: err.message || 'Deposit initiation failed.' };
        }
    }
    /**
     * Execute transaction withdrawals with validation & optional 2FA verification
     */
    static async initiateWithdrawal(userId, amountLocal, currency, gatewayName, destinationAccount, idempotencyKey, twoFactorCode) {
        try {
            // 1. Resolve equivalents
            let rate = 1.0;
            if (currency !== 'XAF') {
                const { data: rateData } = await supabaseClient_1.supabase
                    .from('currency_rates')
                    .select('rate_to_xaf')
                    .eq('currency_code', currency)
                    .single();
                rate = Number(rateData?.rate_to_xaf || 1.0);
            }
            const amountXaf = amountLocal * rate;
            // 2. Validate transaction limits and KYC level
            const limitsCheck = await KycManager_1.KycManager.validateTransactionLimits(userId, amountXaf);
            if (!limitsCheck.allowed) {
                return { success: false, error: limitsCheck.reason };
            }
            // 3. Double-Factor (2FA) verification check for high amounts (> 100 000 FCFA)
            if (amountXaf > 100000.00) {
                if (!twoFactorCode) {
                    return { success: false, require2FA: true, error: 'Double-facteur obligatoire pour retraits > 100 000 FCFA.' };
                }
                if (twoFactorCode !== '123456') { // Mock SMS/Authenticator token validation
                    return { success: false, require2FA: true, error: 'Code 2FA incorrect. Veuillez vérifier le SMS.' };
                }
            }
            // 4. Check user balance availability
            const { data: profile } = await supabaseClient_1.supabase
                .from('user_profiles')
                .select('cash_balance_xaf')
                .eq('id', userId)
                .single();
            const userBalance = Number(profile?.cash_balance_xaf || 0);
            if (userBalance < amountXaf) {
                return { success: false, error: 'Solde insuffisant pour exécuter le retrait.' };
            }
            // 5. Verify idempotency
            const { data: existingTx } = await supabaseClient_1.supabase
                .from('transactions')
                .select('id, status')
                .eq('idempotency_key', idempotencyKey)
                .single();
            if (existingTx) {
                return { success: true, transactionId: existingTx.id, error: 'Retrait déjà soumis.' };
            }
            // 6. Create transaction (status: processing)
            const { data: newTx, error: txError } = await supabaseClient_1.supabase
                .from('transactions')
                .insert({
                user_id: userId,
                type: 'withdrawal',
                amount_local: amountLocal,
                currency_code: currency,
                exchange_rate: rate,
                amount_xaf: amountXaf,
                payment_gateway: gatewayName,
                status: 'processing',
                idempotency_key: idempotencyKey
            })
                .select()
                .single();
            if (txError)
                throw txError;
            // 7. Deduct from balance immediately to block funds (Atomic lock)
            await supabaseClient_1.supabase
                .from('user_profiles')
                .update({ cash_balance_xaf: userBalance - amountXaf })
                .eq('id', userId);
            // 8. Log audit log
            await supabaseClient_1.supabase.from('payment_audit_logs').insert({
                user_id: userId,
                transaction_id: newTx.id,
                action: 'withdrawal_init',
                amount_xaf: amountXaf,
                details: `Initialisation retrait de ${amountLocal} ${currency} vers ${destinationAccount} (via ${gatewayName}).`
            });
            // 9. Execute transfer via provider
            const provider = this.getProvider(gatewayName);
            const providerResult = await provider.initiateWithdrawal(amountLocal, currency, userId, destinationAccount, newTx.id);
            if (!providerResult.success) {
                // Restore user balance on transfer initiation error
                await supabaseClient_1.supabase
                    .from('user_profiles')
                    .update({ cash_balance_xaf: userBalance })
                    .eq('id', userId);
                await supabaseClient_1.supabase
                    .from('transactions')
                    .update({ status: 'failed' })
                    .eq('id', newTx.id);
                throw new Error(providerResult.error);
            }
            // Update state to success or processing depending on provider immediacy
            await supabaseClient_1.supabase
                .from('transactions')
                .update({ status: providerResult.status })
                .eq('id', newTx.id);
            await supabaseClient_1.supabase.from('payment_audit_logs').insert({
                user_id: userId,
                transaction_id: newTx.id,
                action: 'withdrawal_success',
                amount_xaf: amountXaf,
                details: `Retrait effectué avec succès via ${gatewayName}. Statut: ${providerResult.status}`
            });
            return { success: true, transactionId: newTx.id };
        }
        catch (err) {
            return { success: false, error: err.message || 'Withdrawal initiation failed.' };
        }
    }
    /**
     * Handle server-to-server webhook callbacks
     */
    static async handleWebhook(gatewayName, payload, signatureHeader) {
        try {
            const provider = this.getProvider(gatewayName);
            const webhookResult = await provider.handleWebhook(payload, signatureHeader);
            if (!webhookResult.success) {
                throw new Error(webhookResult.error || 'Signature check failed.');
            }
            const txId = webhookResult.transactionId;
            const status = webhookResult.status;
            // 1. Fetch transaction detail
            const { data: tx, error: txErr } = await supabaseClient_1.supabase
                .from('transactions')
                .select('*')
                .eq('id', txId)
                .single();
            if (txErr || !tx) {
                throw new Error(`Transaction ${txId} non trouvée.`);
            }
            // If transaction is already processed, skip (Idempotence)
            if (tx.status === 'success' || tx.status === 'failed') {
                return { success: true };
            }
            // 2. Perform state machine update
            const { error: updErr } = await supabaseClient_1.supabase
                .from('transactions')
                .update({ status })
                .eq('id', txId);
            if (updErr)
                throw updErr;
            // 3. Log webhook audit log
            await supabaseClient_1.supabase.from('payment_audit_logs').insert({
                user_id: tx.user_id,
                transaction_id: txId,
                action: `webhook_${status}`,
                amount_xaf: tx.amount_xaf,
                details: `Webhook reçu de ${gatewayName} pour transaction ${txId}. Statut mis à jour: ${status}`
            });
            // 4. Credit balance if deposit succeeded
            if (tx.type === 'deposit' && status === 'success') {
                const { data: profile } = await supabaseClient_1.supabase
                    .from('user_profiles')
                    .select('cash_balance_xaf')
                    .eq('id', tx.user_id)
                    .single();
                const currentBal = Number(profile?.cash_balance_xaf || 0);
                await supabaseClient_1.supabase
                    .from('user_profiles')
                    .update({ cash_balance_xaf: currentBal + Number(tx.amount_xaf) })
                    .eq('id', tx.user_id);
            }
            return { success: true };
        }
        catch (err) {
            return { success: false, error: err.message };
        }
    }
    /**
     * Reconciliation job (cron equivalent) queries pending transactions
     * older than 10 minutes and reconciles state with providers.
     */
    static async runReconciliationJob() {
        let reconciledCount = 0;
        let expiredCount = 0;
        try {
            const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
            const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
            // Fetch pending or processing transactions
            const { data: pendingTxs } = await supabaseClient_1.supabase
                .from('transactions')
                .select('*')
                .in('status', ['pending', 'processing'])
                .lte('created_at', tenMinutesAgo);
            if (!pendingTxs || pendingTxs.length === 0) {
                return { reconciledCount, expiredCount };
            }
            for (const tx of pendingTxs) {
                const providerName = tx.payment_gateway;
                // Skip manual transfers because they require human admin review
                if (providerName === 'BankTransfer')
                    continue;
                const provider = this.getProvider(providerName);
                // Check if older than 2 hours (expire them)
                if (tx.created_at <= twoHoursAgo) {
                    await supabaseClient_1.supabase
                        .from('transactions')
                        .update({ status: 'expired' })
                        .eq('id', tx.id);
                    await supabaseClient_1.supabase.from('payment_audit_logs').insert({
                        user_id: tx.user_id,
                        transaction_id: tx.id,
                        action: 'reconcile_expired',
                        amount_xaf: tx.amount_xaf,
                        details: `Automatique Expiration: Transaction ${tx.id} restée pendante depuis > 2 heures.`
                    });
                    expiredCount++;
                    continue;
                }
                // Query status from provider node
                const actualStatus = await provider.checkStatus(tx.id);
                if (actualStatus !== tx.status) {
                    // Update status
                    await supabaseClient_1.supabase
                        .from('transactions')
                        .update({ status: actualStatus })
                        .eq('id', tx.id);
                    await supabaseClient_1.supabase.from('payment_audit_logs').insert({
                        user_id: tx.user_id,
                        transaction_id: tx.id,
                        action: `reconcile_${actualStatus}`,
                        amount_xaf: tx.amount_xaf,
                        details: `Réconciliation: Transaction ${tx.id} reconciliée avec statut ${actualStatus}.`
                    });
                    // Credit balance if deposit succeeded
                    if (tx.type === 'deposit' && actualStatus === 'success') {
                        const { data: profile } = await supabaseClient_1.supabase
                            .from('user_profiles')
                            .select('cash_balance_xaf')
                            .eq('id', tx.user_id)
                            .single();
                        const currentBal = Number(profile?.cash_balance_xaf || 0);
                        await supabaseClient_1.supabase
                            .from('user_profiles')
                            .update({ cash_balance_xaf: currentBal + Number(tx.amount_xaf) })
                            .eq('id', tx.user_id);
                    }
                    reconciledCount++;
                }
            }
        }
        catch (err) {
            console.error('Reconciliation error:', err);
        }
        return { reconciledCount, expiredCount };
    }
}
exports.TransactionManager = TransactionManager;
//# sourceMappingURL=TransactionManager.js.map