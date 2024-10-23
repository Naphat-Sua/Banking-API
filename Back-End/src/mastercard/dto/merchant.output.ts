interface MerchantType {
    id: number;
    name: string;
}

interface MerchantData {
    id: number;
    merchantId: string;
    merchantName: string;
    apiKey: string;
    merchantUrl: string;
    lineId: string | null;
    telegramId: string | null;
    email: string | null;
    createdAt: Date;
    updatedAt: Date;
}

interface GetMerchantOutput {
    count: number;
    data: MerchantData[];
}

export { MerchantType, MerchantData, GetMerchantOutput };
