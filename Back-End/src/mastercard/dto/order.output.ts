// order.dto.ts

export class OrderOutput {
    id: number;
    orderId: string;
    amount: number;
    currency: string;
    description: string;
    token: string;
    customerId: number;
    createAt: Date;
    updateAt: Date;
    status: string;
    approveAmount: number;
    type: string;
  }
  