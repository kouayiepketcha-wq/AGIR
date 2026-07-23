import { supabase } from '../supabaseClient';
import { KycStatus } from '../types';

export class KycManager {
  /**
   * Submit identity document for validation (moves status to pending review)
   */
  static async submitKyc(
    userId: string,
    documentUrl: string
  ): Promise<{ success: boolean; status: KycStatus; error?: string }> {
    try {
      // 1. Update profile KYC state
      const { error: pError } = await supabase
        .from('user_profiles')
        .update({
          kyc_status: 'pending',
          kyc_document_url: documentUrl
        })
        .eq('id', userId);

      if (pError) throw pError;

      // 2. Insert compliance record inside audit log
      const { error: aError } = await supabase
        .from('payment_audit_logs')
        .insert({
          user_id: userId,
          action: 'kyc_submitted',
          details: `Soumission pièce justificative d'identité : ${documentUrl}`
        });

      if (aError) throw aError;

      return { success: true, status: 'pending' };
    } catch (err: any) {
      return { success: false, status: 'unverified', error: err.message || 'KYC submission failed.' };
    }
  }

  /**
   * Validate if transaction falls within KYC status thresholds and caps
   */
  static async validateTransactionLimits(
    userId: string,
    amountXaf: number
  ): Promise<{ allowed: boolean; reason?: string }> {
    try {
      // Call the secure limits validator RPC function
      const { data, error } = await supabase.rpc('check_user_transaction_limits', {
        p_user_id: userId,
        p_amount_xaf: amountXaf
      });

      if (error) {
        return { allowed: false, reason: error.message };
      }

      return { allowed: true };
    } catch (err: any) {
      return { allowed: false, reason: err.message || 'Limits check failed.' };
    }
  }

  /**
   * Get current compliance limit quotas and user statistics
   */
  static async getKycStats(userId: string): Promise<{
    kycStatus: KycStatus;
    dailyLimit: number;
    monthlyLimit: number;
    dailySpent: number;
    monthlySpent: number;
  }> {
    try {
      const { data: profile, error: pError } = await supabase
        .from('user_profiles')
        .select('kyc_status, limit_daily_xaf, limit_monthly_xaf')
        .eq('id', userId)
        .single();

      if (pError) throw pError;

      const dailyThreshold = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const monthlyThreshold = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

      const { data: dailyTx, error: dError } = await supabase
        .from('transactions')
        .select('amount_xaf')
        .eq('user_id', userId)
        .in('type', ['deposit', 'withdrawal'])
        .eq('status', 'success')
        .gte('created_at', dailyThreshold);

      if (dError) throw dError;

      const { data: monthlyTx, error: mError } = await supabase
        .from('transactions')
        .select('amount_xaf')
        .eq('user_id', userId)
        .in('type', ['deposit', 'withdrawal'])
        .eq('status', 'success')
        .gte('created_at', monthlyThreshold);

      if (mError) throw mError;

      const dailySpent = dailyTx.reduce((sum, tx) => sum + Number(tx.amount_xaf), 0);
      const monthlySpent = monthlyTx.reduce((sum, tx) => sum + Number(tx.amount_xaf), 0);

      return {
        kycStatus: (profile.kyc_status || 'unverified') as KycStatus,
        dailyLimit: Number(profile.limit_daily_xaf || 1000000),
        monthlyLimit: Number(profile.limit_monthly_xaf || 10000000),
        dailySpent,
        monthlySpent
      };
    } catch (err) {
      // Safe fallback mocks if database table structures are missing auth.uid contexts
      return {
        kycStatus: 'unverified',
        dailyLimit: 1000000,
        monthlyLimit: 10000000,
        dailySpent: 0,
        monthlySpent: 0
      };
    }
  }
}
