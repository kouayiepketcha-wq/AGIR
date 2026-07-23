"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankTransferProvider = void 0;
const PaymentProvider_1 = require("./PaymentProvider");
class BankTransferProvider extends PaymentProvider_1.PaymentProvider {
    providerName = 'BankTransfer';
    /**
     * Register a manual bank deposit request (status: processing, awaiting receipt upload)
     */
    async initiatePayment(amount, currency, userId, reference) {
        try {
            return {
                success: true,
                transactionId: `BT-${reference}`,
                paymentUrl: '#' // Client uploads the wire receipt image in the UI
            };
        }
        catch (err) {
            return { success: false, error: err.message || 'Bank transfer payin failed.' };
        }
    }
    /**
     * Status is checked manually by admins
     */
    async checkStatus(transactionId) {
        // Stays processing until admin manual validation from the back-office
        return 'processing';
    }
    /**
     * Handle admin confirmation callback
     */
    async handleWebhook(payload, signatureHeader) {
        try {
            // Verify callback source is admin dashboard signature (mock secret validation)
            if (signatureHeader !== 'ADMIN_SECRET_KEY') {
                throw new Error('Sécurité Audit: Signature admin non reconnue.');
            }
            const txId = payload.transaction_id;
            const status = payload.action === 'APPROVE' ? 'success' : 'failed';
            return {
                success: true,
                transactionId: txId,
                status
            };
        }
        catch (err) {
            return { success: false, transactionId: '', status: 'failed', error: err.message };
        }
    }
    /**
     * Register manual withdrawal request (status: processing, awaiting manual bank execution)
     */
    async initiateWithdrawal(amount, currency, userId, destinationAccount, reference) {
        try {
            return {
                success: true,
                transactionId: `BT-OUT-${reference}`,
                status: 'processing'
            };
        }
        catch (err) {
            return { success: false, status: 'failed', error: err.message || 'Bank payout request failed.' };
        }
    }
}
exports.BankTransferProvider = BankTransferProvider;
//# sourceMappingURL=BankTransferProvider.js.map