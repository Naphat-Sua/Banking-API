import {Injectable} from '@nestjs/common';
import {DatabaseService} from "../../../database/database.service";

@Injectable()
export class AccountbankService {
    constructor(
        private database: DatabaseService
    ) {
    }


    async getAccountCustomer(id, use_promptpay) {
        const getData = await this.database.mutiAccountRepository.find({
            where: {
                customerId: id
            },
            relations: ['account', 'account.banktype']
        })

        let findCanAccount = await getData.filter(value => value.account && value.account.use && !value.account.isDelete)
        if (use_promptpay) {
            findCanAccount = await findCanAccount.filter(value => value.account.promptpay)
        }

        return findCanAccount.map(value => value.account)
    }
}
