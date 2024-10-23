import {Injectable} from '@nestjs/common';
import {ShareService} from "../../share/share.service";
import {DatabaseService} from "../../database/database.service";
import {GetAccountbankOutput} from "./dto/get-accountbank.output";
import {GetTypebankOutput} from "./dto/get-typebank.output";

@Injectable()
export class BankService {
    constructor(
        private databaseService: DatabaseService,
        private shareService: ShareService
    ) {
    }

    async findBank(payload, query, page: number = 1, rows: number = 20): Promise<GetAccountbankOutput> {
        const skip = (page - 1) * rows
        const getData = await this.databaseService.mutiAccountRepository.createQueryBuilder('MutiAccountBank')
        await getData.leftJoinAndSelect('MutiAccountBank.account', 'AccountBank', 'MutiAccountBank.account IS NOT NULL')
        await getData.leftJoinAndSelect('MutiAccountBank.customer', 'Customer', 'AccountBank.customer IS NOT NULL')
        await getData.leftJoinAndSelect('AccountBank.banktype', 'Banktype', 'AccountBank.banktype IS NOT NULL')
        await getData.where('Customer.id = :CustomerId', {CustomerId: payload.id})
        await getData.andWhere('AccountBank.use = :Use', {Use: true})
        await getData.andWhere('AccountBank.isDelete = :Delete', {Delete: false})
        await getData.limit(rows)
        await getData.offset(skip)

        return {
            count: await getData.getCount(),
            data: (await getData.getMany()).map(value => {
                return {
                    id: value.id,
                    account: value.account ? value.account.account : null,
                    name: value.account ? value.account.name : null,
                    promptpay: value.account ? value.account.promptpay : null,
                    bank: value.account && value.account.banktype ? value.account.banktype.key : null
                }
            })
        }
    }

    async typeBank(): Promise<GetTypebankOutput[]> {
        const getData = await this.databaseService.typebankRepository.find()
        return getData.map(value => {
            return {
                id: value.id,
                name: value.name,
                key: value.key
            }
        })
    }
}
