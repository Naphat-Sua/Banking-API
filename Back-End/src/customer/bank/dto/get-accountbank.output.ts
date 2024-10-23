class DataAccountBank {
    id: number
    account?: string
    name?: string
    promptpay?: string
    bank?: string
}

export class GetAccountbankOutput {
    count: number

    data: DataAccountBank[]
}
