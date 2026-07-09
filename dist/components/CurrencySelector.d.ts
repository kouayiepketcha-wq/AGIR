import { CurrencyRate } from '../types';
export declare class CurrencySelector {
    private containerId;
    private selectedCurrency;
    private currencyRates;
    private onSelectCallback;
    constructor(containerId: string, onSelect: (rate: CurrencyRate) => void);
    loadRates(): Promise<void>;
    getSelectedCurrency(): string;
    getRateForSelected(): number;
    private render;
}
