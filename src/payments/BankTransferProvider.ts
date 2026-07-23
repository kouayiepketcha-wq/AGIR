import { PaymentProvider, PaymentInitResult, WithdrawalResult } from './PaymentProvider';
import { TransactionStatus } from '../types';

export class BankTransferProvider extends PaymentProvider {
  providerName = 'BankTransfer';

  /**
   * Register a manual bank deposit request (status: processing, awaiting receipt upload)
   */
  async initiatePayment(
    amount: number,
    currency: string,
    userId: string,
    reference: string
  ): Promise<PaymentInitResult> {
    try {
      return {
        success: true,
        transactionId: `BT-${reference}`,
        paymentUrl: '#' // Client uploads the wire receipt image in the UI
      };
    } catch (err: any) {
      return { success: false, error: err.message || 'Bank transfer payin failed.' };
    }
  }

  /**
   * Status is checked manually by admins
   */
  async checkStatus(transactionId: string): Promise<TransactionStatus> {
    // Stays processing until admin manual validation from the back-office
    return 'processing';
  }

  /**
   * Handle admin confirmation callback
   */
  async handleWebhook(
    payload: any,
    signatureHeader?: string
  ): Promise<{ success: boolean; transactionId: string; status: TransactionStatus; error?: string }> {
    try {
      // Verify callback source is admin dashboard signature (mock secret validation)
      if (signatureHeader !== 'ADMIN_SECRET_KEY') {
        throw new Error('Sécurité Audit: Signature admin non reconnue.');
      }

      const txId = payload.transaction_id;
      const status: TransactionStatus = payload.action === 'APPROVE' ? 'success' : 'failed';

      return {
        success: true,
        transactionId: txId,
        status
      };
    } catch (err: any) {
      return { success: false, transactionId: '', status: 'failed', error: err.message };
    }
  }

  /**
   * Register manual withdrawal request (status: processing, awaiting manual bank execution)
   */
  async initiateWithdrawal(
    amount: number,
    currency: string,
    userId: string,
    destinationAccount: string,
    reference: string
  ): Promise<WithdrawalResult> {
    try {
      return {
        success: true,
        transactionId: `BT-OUT-${reference}`,
        status: 'processing'
      };
    } catch (err: any) {
      return { success: false, status: 'failed', error: err.message || 'Bank payout request failed.' };
    }
  }
}
