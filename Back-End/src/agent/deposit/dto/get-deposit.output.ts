import {Relection} from "./relection";

class DataDeposit {
    id: number

    account: string

    bank: string

    customer: Relection

    orderid: string

    qrcode: boolean

    price: number

    mdr: number

    from_account: string

    from_bank: string

    from_name: string

    status: string

    createdAt: Date

    updatedAt: Date
}

export class GetDepositOut {
    count: number

    data: DataDeposit[]
}
