// payment-response.dto.ts

export class PaymentResponse {
  message: string
  txid: string
  customer_uid: string
  invoice_amount: number
  invoice_currency: string
  payment_amount: string
  payment_token: string
  rates: string
  payment_address: string
  enable_promotion: boolean
  expired_at: string
  wallet_type: string
}
