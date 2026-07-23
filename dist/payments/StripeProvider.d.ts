import { PaymentProvider, PaymentInitResult, WithdrawalResult } from './PaymentProvider';
import { TransactionStatus } from '../types';
export declare class StripeProvider extends PaymentProvider {
    providerName: string;
    private apiKey;
    private webhookSecret;
    constructor();
    /**
     * Create Stripe Checkout Session
     */
    initiatePayment(amount: number, currency: string, userId: string, reference: string): Promise<PaymentInitResult>;
    /**
     * Sync check of Stripe PaymentIntent status
     */
    checkStatus(transactionId: string): Promise<TransactionStatus>;
    /**
     * Verify signature and handle incoming Stripe webhooks
     */
    handleWebhook(payload: any, signatureHeader?: string): Promise<{
        success: boolean;
        transactionId: string;
        status: TransactionStatus;
        error?: string;
    }>;
    /**
     * Disburse/transfer funds using Stripe Payouts API
     */
    initiateWithdrawal(amount: number, currency: string, userId: string, destinationAccount: string, reference: string): Promise<WithdrawalResult>;
}
