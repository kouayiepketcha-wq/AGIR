import { TransactionStatus } from '../types';
export interface PaymentInitResult {
    success: boolean;
    transactionId?: string;
    paymentUrl?: string;
    ussdCode?: string;
    error?: string;
}
export interface WithdrawalResult {
    success: boolean;
    transactionId?: string;
    status: TransactionStatus;
    error?: string;
}
export declare abstract class PaymentProvider {
    abstract providerName: string;
    /**
     * Initiate a customer deposit/pay-in transaction.
     */
    abstract initiatePayment(amount: number, currency: string, userId: string, reference: string): Promise<PaymentInitResult>;
    /**
     * Check the current status of a transaction from the provider node.
     */
    abstract checkStatus(transactionId: string): Promise<TransactionStatus>;
    /**
     * Process server-to-server webhook notifications with signature verification.
     */
    abstract handleWebhook(payload: any, signatureHeader?: string): Promise<{
        success: boolean;
        transactionId: string;
        status: TransactionStatus;
        error?: string;
    }>;
    /**
     * Disburse/transfer funds to a user mobile wallet or bank account (withdrawal/pay-out).
     */
    abstract initiateWithdrawal(amount: number, currency: string, userId: string, destinationAccount: string, // Phone number or RIB
    reference: string): Promise<WithdrawalResult>;
}
