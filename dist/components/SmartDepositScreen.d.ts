export declare class SmartDepositScreen {
    private containerId;
    private selectorInstance;
    private currentRate;
    private currencyCode;
    private depositAmount;
    private userId;
    constructor(containerId: string, userId: string);
    init(): Promise<void>;
    private renderContainer;
    private updateConversion;
    private toggleGatewayPanel;
    private handleDepositSubmit;
}
