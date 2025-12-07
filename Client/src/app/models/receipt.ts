export interface ReceiptItem {
    description?: string;
    amount: number;
    quantity: number;
}

export interface Receipt {
    id: string;
    merchantName?: string;
    storeDate?: string; // ISO string
    totalAmount: number;
    currency?: string;
    items: ReceiptItem[];
    uploadedAt?: string;
}
