import { PaymentProvider, PaymentInitResult, WithdrawalResult } from './PaymentProvider';
import { TransactionStatus } from '../types';
export declare class CinetPayProvider extends PaymentProvider {
    providerName: string;
    private apiKey;
    private siteId;
    private apiPassword?;
    constructor();
    /**
     * Initiate a Mobile Money payment
     */
    initiatePayment(amount: number, currency: string, userId: string, reference: string): Promise<PaymentInitResult>;
    /**
     * Sync check of transaction status
     */
    checkStatus(transactionId: string): Promise<TransactionStatus>;
    /**
     * Processes webhook notifications with strict SHA256 validation
     */
    handleWebhook(payload: any, signatureHeader?: string): Promise<{
        success: boolean;
        transactionId: string;
        status: TransactionStatus;
        error?: string;
    }>;
    /**
     * Outward Mass Payout to client mobile wallet
     */
    initiateWithdrawal(amount: number, currency: string, userId: string, destinationAccount: string, reference: string): Promise<WithdrawalResult>;
}
