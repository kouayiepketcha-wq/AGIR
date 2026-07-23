import { PaymentProvider, PaymentInitResult, WithdrawalResult } from './PaymentProvider';
import { TransactionStatus } from '../types';
export declare class BankTransferProvider extends PaymentProvider {
    providerName: string;
    /**
     * Register a manual bank deposit request (status: processing, awaiting receipt upload)
     */
    initiatePayment(amount: number, currency: string, userId: string, reference: string): Promise<PaymentInitResult>;
    /**
     * Status is checked manually by admins
     */
    checkStatus(transactionId: string): Promise<TransactionStatus>;
    /**
     * Handle admin confirmation callback
     */
    handleWebhook(payload: any, signatureHeader?: string): Promise<{
        success: boolean;
        transactionId: string;
        status: TransactionStatus;
        error?: string;
    }>;
    /**
     * Register manual withdrawal request (status: processing, awaiting manual bank execution)
     */
    initiateWithdrawal(amount: number, currency: string, userId: string, destinationAccount: string, reference: string): Promise<WithdrawalResult>;
}
