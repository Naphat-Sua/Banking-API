import {ReletionOutput} from "./reletion.output";

class DataWithdraw {
    id: number

    orderid: string

    account: string

    name: string

    to_banking: string

    price: number

    customer: ReletionOutput

    mdr: number

    status: string
}

export class GetWithdrawOutput {
    count: number

    data: DataWithdraw[]
}
