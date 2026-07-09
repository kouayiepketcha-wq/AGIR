// ==========================================================================
// AGIR FinTech - SmartDepositScreen Component (TypeScript)
// ==========================================================================

import { supabase } from '../supabaseClient';
import { CurrencySelector } from './CurrencySelector';
import { CurrencyRate, Transaction } from '../types';

export class SmartDepositScreen {
  private containerId: string;
  private selectorInstance!: CurrencySelector;
  private currentRate: number = 1.0;
  private currencyCode: string = 'XAF';
  private depositAmount: number = 0;
  private userId: string;

  constructor(containerId: string, userId: string) {
    this.containerId = containerId;
    this.userId = userId;
  }

  // 1. Initialize screen and nested currency selector
  public async init(): Promise<void> {
    this.renderContainer();
    
    // Instantiate selector inside the nested div
    this.selectorInstance = new CurrencySelector('nested-currency-selector', (rate: CurrencyRate) => {
      this.currencyCode = rate.currency_code;
      this.currentRate = rate.rate_to_xaf;
      this.updateConversion();
      this.toggleGatewayPanel();
    });

    await this.selectorInstance.loadRates();
    this.toggleGatewayPanel();
  }

  // 2. Initial markup setup
  private renderContainer(): void {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="deposit-card glass-card">
        <h3 class="view-title">Recharger mon Compte (FX Multi-Devises)</h3>
        <p class="view-desc">Déposez n'importe quelle devise africaine ou internationale. Nous convertissons et créditons votre compte instantanément en FCFA.</p>
        
        <div class="deposit-form-layout">
          <!-- Currency Selector Container -->
          <div id="nested-currency-selector"></div>

          <!-- Amount input -->
          <div class="form-group margin-top-md">
            <label for="deposit-input-amount" class="fx-field-label">Montant à déposer</label>
            <div class="input-currency-wrapper">
              <input type="number" id="deposit-input-amount" class="custom-input" placeholder="Entrez le montant" value="10000" min="100">
              <span class="currency-tag-indicator" id="local-currency-indicator">XAF</span>
            </div>
          </div>

          <!-- FX Converted Value Display -->
          <div class="fx-converter-box">
            <div class="fx-conversion-line">
              <span class="fx-conv-label">Équivalent Crédité :</span>
              <strong class="fx-conv-value" id="converted-xaf-display">10 000 FCFA</strong>
            </div>
            <div class="fx-fees-line">
              <span>Frais de conversion (Garantie Shield) :</span>
              <strong id="fx-fees-display">0 FCFA</strong>
            </div>
          </div>

          <!-- Gateway Selector Area (Dynamic) -->
          <div class="gateway-integrations-panel" id="gateway-routing-panel">
            <!-- Dynamic gateways here -->
          </div>

          <!-- PIN validation security trigger -->
          <div class="form-group margin-top-md" style="max-width: 250px;">
            <label for="deposit-pin-input" class="fx-field-label">Code PIN Shield (4 chiffres)</label>
            <input type="password" id="deposit-pin-input" class="custom-input pin-input" placeholder="••••" maxlength="4" value="0000">
          </div>

          <button class="btn btn-primary btn-block margin-top-md" id="btn-execute-deposit">
            Confirmer le dépôt et créditer
          </button>
        </div>
      </div>
    `;

    // Attach listeners
    const amountInput = document.getElementById('deposit-input-amount') as HTMLInputElement;
    if (amountInput) {
      amountInput.addEventListener('input', (e) => {
        this.depositAmount = parseFloat((e.target as HTMLInputElement).value) || 0;
        this.updateConversion();
      });
      this.depositAmount = parseFloat(amountInput.value) || 0;
    }

    const submitBtn = document.getElementById('btn-execute-deposit');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => this.handleDepositSubmit());
    }
  }

  // 3. Update converted cash metrics
  private updateConversion(): void {
    const indicator = document.getElementById('local-currency-indicator');
    if (indicator) indicator.innerText = this.currencyCode;

    const amountInXaf = this.depositAmount * this.currentRate;
    const fees = this.currencyCode === 'XAF' ? 0 : Math.round(amountInXaf * 0.005); // 0.5% FX Fee for foreign currencies
    const netCredited = amountInXaf - fees;

    const displayXaf = document.getElementById('converted-xaf-display');
    if (displayXaf) {
      displayXaf.innerText = new Intl.NumberFormat('fr-FR').format(netCredited) + ' FCFA';
    }

    const displayFees = document.getElementById('fx-fees-display');
    if (displayFees) {
      displayFees.innerText = new Intl.NumberFormat('fr-FR').format(fees) + ' FCFA';
    }
  }

  // 4. Toggle view layouts between Stripe/Flutterwave and GIMAC/CinetPay
  private toggleGatewayPanel(): void {
    const panel = document.getElementById('gateway-routing-panel');
    if (!panel) return;

    if (this.currencyCode === 'XAF') {
      // Local Central African payment
      panel.innerHTML = `
        <div class="gateway-info-box regional">
          <h4 class="gateway-title"><i data-lucide="smartphone"></i> Passerelle Mobile Money Régionale GIMAC</h4>
          <p class="gateway-desc">Votre recharge s'effectuera via la plateforme interoperable n8n/CinetPay & GIMAC (MTN MoMo, Orange Money, Moov, Airtel).</p>
          <div class="operator-drapeaux">
            <span class="badge-operator">MTN Mobile Money</span>
            <span class="badge-operator">Orange Money</span>
            <span class="badge-operator">Airtel Money</span>
          </div>
        </div>
      `;
    } else {
      // International / Pan-african payment
      const isCard = this.currencyCode === 'USD' || this.currencyCode === 'EUR' || this.currencyCode === 'GBP';
      const gatewayName = isCard ? 'Stripe Gateway' : 'Flutterwave Panafrican Hub';
      const logoIcon = isCard ? 'credit-card' : 'globe';

      panel.innerHTML = `
        <div class="gateway-info-box international">
          <h4 class="gateway-title"><i data-lucide="${logoIcon}"></i> Passerelle ${gatewayName}</h4>
          <p class="gateway-desc">Intégration d'un formulaire sécurisé multi-devises (Stripe-MCP / Flutterwave-MCP). Chiffrement TLS 1.3 de bout en bout.</p>
          <div class="international-card-form">
            <div class="form-row">
              <input type="text" class="custom-input" placeholder="Numéro de carte" style="flex-grow:3;">
              <input type="text" class="custom-input" placeholder="MM/AA" style="flex-grow:1;">
              <input type="text" class="custom-input" placeholder="CVV" style="flex-grow:1;">
            </div>
          </div>
        </div>
      `;
    }

    if ((window as any).lucide) {
      (window as any).lucide.createIcons();
    }
  }

  // 5. Submit transaction log to database
  private async handleDepositSubmit(): Promise<void> {
    const pinInput = document.getElementById('deposit-pin-input') as HTMLInputElement;
    const pin = pinInput ? pinInput.value : '';

    if (!pin || pin.length !== 4) {
      alert('Sécurité Shield: Veuillez entrer un code PIN à 4 chiffres.');
      return;
    }

    if (this.depositAmount <= 0) {
      alert('Erreur: Veuillez saisir un montant supérieur à 0.');
      return;
    }

    // Call Supabase verification (mocking profile PIN check first)
    try {
      // Verify profile local PIN via Supabase
      const { data: profile, error: pError } = await supabase
        .from('user_profiles')
        .select('transaction_pin, cash_balance_xaf')
        .eq('id', this.userId)
        .single();

      if (pError) throw pError;

      if (!profile || profile.transaction_pin !== pin) {
        alert('Sécurité Shield: Code PIN incorrect.');
        return;
      }

      // Convert local cost metrics
      const amountInXaf = this.depositAmount * this.currentRate;
      const fees = this.currencyCode === 'XAF' ? 0 : Math.round(amountInXaf * 0.005);
      const creditedAmountXaf = amountInXaf - fees;
      const gateway = this.currencyCode === 'XAF' ? 'GIMAC/CinetPay' : (this.currencyCode === 'USD' || this.currencyCode === 'EUR' ? 'Stripe' : 'Flutterwave');

      // Update User profile balance
      const newBalance = Number(profile.cash_balance_xaf) + creditedAmountXaf;
      const { error: uError } = await supabase
        .from('user_profiles')
        .update({ cash_balance_xaf: newBalance })
        .eq('id', this.userId);

      if (uError) throw uError;

      // Log Transaction row
      const newTransaction: Transaction = {
        user_id: this.userId,
        type: 'deposit',
        amount_local: this.depositAmount,
        currency_code: this.currencyCode,
        exchange_rate: this.currentRate,
        amount_xaf: creditedAmountXaf,
        payment_gateway: gateway,
        status: 'success'
      };

      const { error: tError } = await supabase
        .from('transactions')
        .insert([newTransaction]);

      if (tError) throw tError;

      // Trigger user alerts
      alert(`Dépôt de ${this.depositAmount} ${this.currencyCode} réussi !\nVotre compte a été crédité de ${creditedAmountXaf.toLocaleString('fr-FR')} FCFA.`);
      
      // Reset inputs
      const amountInput = document.getElementById('deposit-input-amount') as HTMLInputElement;
      if (amountInput) amountInput.value = '10000';
      this.depositAmount = 10000;
      this.updateConversion();

    } catch (err) {
      console.error('Error executing deposit:', err);
      alert('Une erreur est survenue lors de la communication avec la base de données Supabase.');
    }
  }
}
