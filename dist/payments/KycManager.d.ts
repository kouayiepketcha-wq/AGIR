import { KycStatus } from '../types';
export declare class KycManager {
    /**
     * Submit identity document for validation (moves status to pending review)
     */
    static submitKyc(userId: string, documentUrl: string): Promise<{
        success: boolean;
        status: KycStatus;
        error?: string;
    }>;
    /**
     * Validate if transaction falls within KYC status thresholds and caps
     */
    static validateTransactionLimits(userId: string, amountXaf: number): Promise<{
        allowed: boolean;
        reason?: string;
    }>;
    /**
     * Get current compliance limit quotas and user statistics
     */
    static getKycStats(userId: string): Promise<{
        kycStatus: KycStatus;
        dailyLimit: number;
        monthlyLimit: number;
        dailySpent: number;
        monthlySpent: number;
    }>;
}
