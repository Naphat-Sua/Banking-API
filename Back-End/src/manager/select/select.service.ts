import { Injectable } from '@nestjs/common';
import {ShareService} from "../../share/share.service";
import {DatabaseService} from "../../database/database.service";

@Injectable()
export class SelectService {
    constructor(
        private databaseService: DatabaseService,
        private shareService: ShareService
    ) {
    }

    async selectAccount(query) {
        const QueryString = {
            isDelete: false,
            use: true,
        }
        if (query.customerId && !isNaN(Number(query.customerId))) {
            QueryString['customerId'] = Number(query.customerId)
        }
        const getData = await this.databaseService.accountbankRepository.find({
            where: QueryString,
            relations: ['banktype']
        })
        return getData.map(value => {
            return {
                value: value.id,
                label: `${value.account} ${value.name} (${value.banktype ? value.banktype.key : ''})`
            }
        });
    }

    async selelctTypeBank() {
        const getData = await this.databaseService.typebankRepository.find()
        return getData.map(value => {
            return {
                value: value.id,
                label: value.nameEn
            }
        })
    }

    async selectCustomer() {
        const getData = await this.databaseService.customerRepository.find({
            where: {
                isDelete: false
            }
        })
        return getData.map(value => {
            return {
                value: value.id,
                label: `${value.username}`
            }
        })
    }

    async selectOperation() {
        const getData = await this.databaseService.operationRepository.find({
            where: {
                isDelete: false
            }
        })
        return getData.map(value => {
            return {
                value: value.id,
                label: value.username
            }
        })
    }
}
