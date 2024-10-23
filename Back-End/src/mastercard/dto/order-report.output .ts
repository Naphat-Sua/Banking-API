class OrderOutput {
    id: number;
    merchantId: string;
    orderId: string;
    amount: number;
    currency: string;
    description: string;
    token: string;
    customerId: number;
    createAt: string;
    updateAt: string;
    status: string;
    approveAmount: number;
    type: string;
    successIndicator: string//for callback fro mastercard
  }

interface GetOrderOutput {
    count: number;
    data: OrderOutput[];
}

export {OrderOutput, GetOrderOutput };
