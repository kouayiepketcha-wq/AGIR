export interface CurrencyRate {
    id?: string;
    currency_code: string;
    currency_name: string;
    flag_emoji: string;
    rate_to_xaf: number;
    updated_at?: string;
}
export type KycStatus = 'unverified' | 'pending' | 'verified';
export type TransactionStatus = 'pending' | 'processing' | 'success' | 'failed' | 'expired';
export interface UserProfile {
    id: string;
    full_name: string;
    cash_balance_xaf: number;
    transaction_pin: string;
    risk_profile: string;
    kyc_status: KycStatus;
    kyc_document_url?: string;
    limit_daily_xaf: number;
    limit_monthly_xaf: number;
    updated_at?: string;
}
export interface Investment {
    id?: string;
    user_id: string;
    ticker: string;
    quantity: number;
    avg_buy_price_xaf: number;
    created_at?: string;
}
export interface Transaction {
    id?: string;
    user_id: string;
    type: 'deposit' | 'withdrawal' | 'buy' | 'sell';
    ticker?: string;
    amount_local: number;
    currency_code: string;
    exchange_rate: number;
    amount_xaf: number;
    payment_gateway: string;
    status: TransactionStatus;
    idempotency_key?: string;
    created_at?: string;
}
export interface PaymentAuditLog {
    id?: string;
    user_id: string;
    transaction_id?: string;
    action: string;
    amount_xaf?: number;
    details: string;
    created_at?: string;
}
export interface FXConversionResult {
    success: boolean;
    ticker?: string;
    qty?: number;
    cost_xaf?: number;
    cost_local?: number;
    fx_rate?: number;
    error?: string;
}
export interface PaymentGatewayConfig {
    gateway: 'GIMAC' | 'CinetPay' | 'Stripe' | 'Flutterwave' | 'BankTransfer';
    currencyCode: string;
    isInternational: boolean;
    apiEndpoint?: string;
    publicKey?: string;
}
