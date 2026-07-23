export declare class TransactionManager {
    private static providers;
    /**
     * Helper to retrieve a provider by name
     */
    private static getProvider;
    /**
     * Generates a unique idempotency key based on parameters
     */
    static generateIdempotencyKey(userId: string, amount: number, type: string, gateway: string): string;
    /**
     * Initiate customer deposit
     */
    static initiateDeposit(userId: string, amountLocal: number, currency: string, gatewayName: string, idempotencyKey: string): Promise<{
        success: boolean;
        transactionId?: string;
        paymentUrl?: string;
        ussdCode?: string;
        error?: string;
    }>;
    /**
     * Execute transaction withdrawals with validation & optional 2FA verification
     */
    static initiateWithdrawal(userId: string, amountLocal: number, currency: string, gatewayName: string, destinationAccount: string, idempotencyKey: string, twoFactorCode?: string): Promise<{
        success: boolean;
        transactionId?: string;
        require2FA?: boolean;
        error?: string;
    }>;
    /**
     * Handle server-to-server webhook callbacks
     */
    static handleWebhook(gatewayName: string, payload: any, signatureHeader?: string): Promise<{
        success: boolean;
        error?: string;
    }>;
    /**
     * Reconciliation job (cron equivalent) queries pending transactions
     * older than 10 minutes and reconciles state with providers.
     */
    static runReconciliationJob(): Promise<{
        reconciledCount: number;
        expiredCount: number;
    }>;
}
