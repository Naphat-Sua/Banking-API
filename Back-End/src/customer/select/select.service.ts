import {Injectable} from '@nestjs/common';
import {ShareService} from "../../share/share.service";
import {DatabaseService} from "../../database/database.service";

@Injectable()
export class SelectService {
    constructor(
        private databaseService: DatabaseService,
        private shareService: ShareService
    ) {
    }

    async selectAccountBank(payload) {
        const getData = await this.databaseService.mutiAccountRepository.find({
            where: {
                customerId: payload.id,
                account: {
                    use: true,
                    isDelete: false
                }
            },
            relations: ['account']
        })
        return getData.map(value => {
            return {
                value: value.id,
                label: `${value.account.account} ${value.account && value.account.name ? value.account.name : ''} (${value.account.banktype ? value.account.banktype.key : ''})`
            }
        });
    }

    async selectStringTypeBank() {
        const getData = await this.databaseService.typebankRepository.find()
        return getData.map(value => {
            return {
                value: value.key,
                label: value.name
            }
        })
    }

    selelctTypeBank() {
        return this.shareService.selelctTypeBank()
    }
}
