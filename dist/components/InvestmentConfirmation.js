"use strict";
// ==========================================================================
// AGIR FinTech - InvestmentConfirmation Component (TypeScript)
// ==========================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestmentConfirmation = void 0;
const supabaseClient_1 = require("../supabaseClient");
class InvestmentConfirmation {
    containerId;
    userId;
    ticker;
    quantity;
    assetName;
    assetPriceXaf;
    selectedCurrency = 'XAF';
    currentRate = 1.0;
    onCompleteCallback;
    onCancelCallback;
    constructor(containerId, userId, ticker, quantity, assetName, assetPriceXaf, currencyCode, fxRate, onComplete, onCancel) {
        this.containerId = containerId;
        this.userId = userId;
        this.ticker = ticker;
        this.quantity = quantity;
        this.assetName = assetName;
        this.assetPriceXaf = assetPriceXaf;
        this.selectedCurrency = currencyCode;
        this.currentRate = fxRate;
        this.onCompleteCallback = onComplete;
        this.onCancelCallback = onCancel;
    }
    // 1. Initial render of checkout recap screen
    render() {
        const container = document.getElementById(this.containerId);
        if (!container)
            return;
        const totalCostXaf = this.quantity * this.assetPriceXaf;
        const totalCostLocal = totalCostXaf / this.currentRate;
        container.innerHTML = `
      <div class="confirm-modal-backdrop active" id="investment-confirm-modal">
        <div class="confirm-modal-container glass-card">
          <div class="confirm-modal-header">
            <h3><i data-lucide="shield-check"></i> Validation de l'Achat</h3>
            <button class="btn-close-confirm" id="btn-cancel-confirmation"><i data-lucide="x"></i></button>
          </div>
          
          <div class="confirm-modal-body">
            <!-- Asset Brief -->
            <div class="confirm-asset-brief">
              <span class="brief-ticker">${this.ticker}</span>
              <div class="brief-info">
                <h4>${this.assetName}</h4>
                <span>${this.quantity} unités à ${this.assetPriceXaf.toLocaleString('fr-FR')} FCFA</span>
              </div>
            </div>

            <!-- Financial Recap -->
            <div class="confirm-recap-table">
              <div class="recap-row">
                <span class="recap-label">Valeur Investie à la BVMAC :</span>
                <strong class="recap-value text-gold">${totalCostXaf.toLocaleString('fr-FR')} FCFA</strong>
              </div>
              <div class="recap-row">
                <span class="recap-label">Taux appliqué (bloqué 5m) :</span>
                <strong class="recap-value">1 ${this.selectedCurrency} = ${this.currentRate.toFixed(4)} FCFA</strong>
              </div>
              <div class="recap-row highlighted">
                <span class="recap-label">Montant à prélever :</span>
                <strong class="recap-value text-green">${totalCostLocal.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} ${this.selectedCurrency}</strong>
              </div>
            </div>

            <div class="security-pin-validation-box">
              <label for="confirm-pin-field">Saisissez votre code PIN de sécurité (4 chiffres)</label>
              <div class="pin-input-row">
                <input type="password" id="confirm-pin-field" class="custom-input pin-input-centered" maxlength="4" placeholder="••••" autocomplete="off">
              </div>
              <p class="pin-disclaimer"><i data-lucide="info"></i> Ce PIN crypte l'ordre et signe la transaction sur la blockchain AGIR.</p>
            </div>
          </div>

          <div class="confirm-modal-footer">
            <button class="btn btn-secondary" id="btn-cancel-checkout">Annuler</button>
            <button class="btn btn-primary" id="btn-confirm-investment-action">
              <i data-lucide="lock"></i> Confirmer et Investir
            </button>
          </div>
        </div>
      </div>
    `;
        // Re-trigger icon parsing
        if (window.lucide) {
            window.lucide.createIcons();
        }
        // Attach button listeners
        const cancelBtn = document.getElementById('btn-cancel-checkout');
        if (cancelBtn)
            cancelBtn.addEventListener('click', () => this.onCancelCallback());
        const closeBtn = document.getElementById('btn-cancel-confirmation');
        if (closeBtn)
            closeBtn.addEventListener('click', () => this.onCancelCallback());
        const confirmBtn = document.getElementById('btn-confirm-investment-action');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => this.executeInvestment());
        }
    }
    // 2. Call Supabase convert_and_invest RPC stored procedure
    async executeInvestment() {
        const pinField = document.getElementById('confirm-pin-field');
        const pin = pinField ? pinField.value : '';
        if (!pin || pin.length !== 4 || !/^\d+$/.test(pin)) {
            alert('Sécurité Shield: Veuillez entrer un code PIN à 4 chiffres.');
            return;
        }
        // Disable button to prevent double execution
        const confirmBtn = document.getElementById('btn-confirm-investment-action');
        if (confirmBtn) {
            confirmBtn.disabled = true;
            confirmBtn.innerText = 'Exécution cryptographique...';
        }
        try {
            // Call Supabase PL/pgSQL function securely
            const { data, error } = await supabaseClient_1.supabase.rpc('convert_and_invest', {
                p_user_id: this.userId,
                p_ticker: this.ticker,
                p_qty: this.quantity,
                p_asset_price_xaf: this.assetPriceXaf,
                p_amount_local: this.quantity * this.assetPriceXaf / this.currentRate,
                p_currency_code: this.selectedCurrency,
                p_transaction_pin: pin
            });
            if (error)
                throw error;
            const result = data;
            if (result.success) {
                alert(`Investissement de ${result.qty} ${result.ticker} validé avec succès !\nMontant débité : ${result.cost_local?.toLocaleString('fr-FR')} ${this.selectedCurrency}.`);
                this.onCompleteCallback(result);
                this.closeModal();
            }
            else {
                alert(`Erreur d'investissement: ${result.error}`);
                if (confirmBtn) {
                    confirmBtn.disabled = false;
                    confirmBtn.innerHTML = '<i data-lucide="lock"></i> Confirmer et Investir';
                    if (window.lucide)
                        window.lucide.createIcons();
                }
            }
        }
        catch (err) {
            console.error('Error invoking convert_and_invest RPC:', err);
            alert('Erreur: Impossible de communiquer avec la base de données sécurisée Supabase.');
            if (confirmBtn) {
                confirmBtn.disabled = false;
                confirmBtn.innerHTML = '<i data-lucide="lock"></i> Confirmer et Investir';
                if (window.lucide)
                    window.lucide.createIcons();
            }
        }
    }
    closeModal() {
        const modal = document.getElementById('investment-confirm-modal');
        if (modal) {
            modal.classList.remove('active');
            modal.remove();
        }
    }
}
exports.InvestmentConfirmation = InvestmentConfirmation;
//# sourceMappingURL=InvestmentConfirmation.js.map