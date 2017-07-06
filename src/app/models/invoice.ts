export interface Invoice {
    checked: boolean;
    internalNumber: string;
    proFormaDate: string;
    finalDate: string;
    proFormaNo: string;
    finalNo: string;
    providerName: string;
    activitiesValue: number;
    grossTotal: number;
    invoiceStatus: string;
    paymentStatus: string;
    paymentDueDate: string;
}