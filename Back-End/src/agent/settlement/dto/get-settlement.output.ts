import {Relection} from "./relection";

class DataSettlement {
    id: number
    orderid: string
    price: number
    to_banking: string
    name: string
    account: string
    customer: Relection
    status: string
    image: string
    mdr: number
    fee: number
    createdAt: Date
    updatedAt: Date
}

export class GetSettlementOutput {
    count: number

    data: DataSettlement[]
}
