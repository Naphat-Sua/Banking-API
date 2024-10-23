
interface MerchantData {
    id: number;
    merchantId: string;
    storeId: string;
    deviceId: string;
    merchantUrl: string;
    lineId: string | null;
    telegramId: string | null;
    email: string | null
    createdAt: Date;
    updatedAt: Date;
}

interface GetMerchantOutput {
    count: number;
    data: MerchantData[];
}

export { MerchantData, GetMerchantOutput };
