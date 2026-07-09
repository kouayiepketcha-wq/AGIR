import { FXConversionResult } from '../types';
export declare class InvestmentConfirmation {
    private containerId;
    private userId;
    private ticker;
    private quantity;
    private assetName;
    private assetPriceXaf;
    private selectedCurrency;
    private currentRate;
    private onCompleteCallback;
    private onCancelCallback;
    constructor(containerId: string, userId: string, ticker: string, quantity: number, assetName: string, assetPriceXaf: number, currencyCode: string, fxRate: number, onComplete: (result: FXConversionResult) => void, onCancel: () => void);
    render(): void;
    private executeInvestment;
    private closeModal;
}
