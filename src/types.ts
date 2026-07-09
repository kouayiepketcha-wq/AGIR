// ==========================================================================
// AGIR FinTech - Multi-currency FX Frontend Type Declarations
// ==========================================================================

export interface CurrencyRate {
  id?: string;
  currency_code: string;
  currency_name: string;
  flag_emoji: string;
  rate_to_xaf: number;
  updated_at?: string;
}

export interface UserProfile {
  id: string;
  full_name: string;
  cash_balance_xaf: number;
  transaction_pin: string;
  risk_profile: string;
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
  status: 'pending' | 'success' | 'failed';
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
  gateway: 'GIMAC' | 'CinetPay' | 'Stripe' | 'Flutterwave';
  currencyCode: string;
  isInternational: boolean;
  apiEndpoint?: string;
  publicKey?: string;
}
