"use strict";
// ==========================================================================
// AGIR FinTech - CurrencySelector Component (TypeScript)
// ==========================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencySelector = void 0;
const supabaseClient_1 = require("../supabaseClient");
class CurrencySelector {
    containerId;
    selectedCurrency = 'XAF';
    currencyRates = [];
    onSelectCallback;
    constructor(containerId, onSelect) {
        this.containerId = containerId;
        this.onSelectCallback = onSelect;
    }
    // 1. Fetch live rates from Supabase
    async loadRates() {
        try {
            const { data, error } = await supabaseClient_1.supabase
                .from('currency_rates')
                .select('id, currency_code, currency_name, flag_emoji, rate_to_xaf');
            if (error)
                throw error;
            if (data) {
                this.currencyRates = data;
            }
        }
        catch (err) {
            console.error('Error fetching currency rates from Supabase:', err);
            // Local fallback simulation if Supabase is offline
            this.currencyRates = [
                { currency_code: 'XAF', currency_name: 'Franc CFA (CEMAC)', flag_emoji: '🇨🇲', rate_to_xaf: 1.0000 },
                { currency_code: 'EUR', currency_name: 'Euro', flag_emoji: '🇪🇺', rate_to_xaf: 655.9570 },
                { currency_code: 'USD', currency_name: 'US Dollar', flag_emoji: '🇺🇸', rate_to_xaf: 605.5000 },
                { currency_code: 'NGN', currency_name: 'Nigerian Naira', flag_emoji: '🇳🇬', rate_to_xaf: 0.4000 },
                { currency_code: 'ZAR', currency_name: 'South African Rand', flag_emoji: '🇿🇦', rate_to_xaf: 32.5000 },
                { currency_code: 'KES', currency_name: 'Kenyan Shilling', flag_emoji: '🇰🇪', rate_to_xaf: 4.7000 }
            ];
        }
        this.render();
    }
    getSelectedCurrency() {
        return this.selectedCurrency;
    }
    getRateForSelected() {
        const rateObj = this.currencyRates.find(r => r.currency_code === this.selectedCurrency);
        return rateObj ? rateObj.rate_to_xaf : 1.0;
    }
    // 2. Render dropdown and flags
    render() {
        const container = document.getElementById(this.containerId);
        if (!container)
            return;
        // Separate CEMAC and Panafrican/International for prioritisation
        const cemacList = this.currencyRates.filter(r => r.currency_code === 'XAF');
        const internationalList = this.currencyRates.filter(r => r.currency_code !== 'XAF');
        // Combine prioritizing CEMAC countries (Cameroon, Gabon, Congo, Chad, CAR, Equatorial Guinea share XAF)
        const sortedRates = [...cemacList, ...internationalList];
        let selectOptionsHtml = '';
        sortedRates.forEach(rate => {
            const isSelected = rate.currency_code === this.selectedCurrency ? 'selected' : '';
            selectOptionsHtml += `
        <option value="${rate.currency_code}" ${isSelected}>
          ${rate.flag_emoji} ${rate.currency_code} - ${rate.currency_name}
        </option>
      `;
        });
        const activeRate = this.getRateForSelected();
        const rateDisplay = this.selectedCurrency === 'XAF'
            ? '1 XAF = 1 FCFA (Monnaie Nationale)'
            : `1 ${this.selectedCurrency} = ${activeRate.toFixed(2)} FCFA (Taux en direct)`;
        container.innerHTML = `
      <div class="fx-selector-wrapper">
        <label for="currency-dropdown" class="fx-field-label">Devise de transaction</label>
        <div class="custom-select-container">
          <select id="currency-dropdown" class="custom-select">
            ${selectOptionsHtml}
          </select>
        </div>
        <div class="fx-rate-stamp" id="fx-rate-display">
          <i data-lucide="refresh-cw" class="spin-icon"></i> ${rateDisplay}
        </div>
      </div>
    `;
        // Re-trigger icon parsing
        if (window.lucide) {
            window.lucide.createIcons();
        }
        // Attach Change listener
        const dropdown = document.getElementById('currency-dropdown');
        if (dropdown) {
            dropdown.addEventListener('change', (e) => {
                const val = e.target.value;
                this.selectedCurrency = val;
                // Update display text
                const currentRate = this.getRateForSelected();
                const displayDiv = document.getElementById('fx-rate-display');
                if (displayDiv) {
                    displayDiv.innerText = val === 'XAF'
                        ? '1 XAF = 1 FCFA (Monnaie Nationale)'
                        : `1 ${val} = ${currentRate.toFixed(2)} FCFA (Taux en direct)`;
                }
                // Trigger parent callback
                const selectedRateObj = this.currencyRates.find(r => r.currency_code === val);
                if (selectedRateObj) {
                    this.onSelectCallback(selectedRateObj);
                }
            });
        }
    }
}
exports.CurrencySelector = CurrencySelector;
//# sourceMappingURL=CurrencySelector.js.map