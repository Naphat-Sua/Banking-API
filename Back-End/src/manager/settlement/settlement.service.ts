import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {ShareService} from "../../share/share.service";
import * as moment from "moment-timezone";
import {DatabaseService} from "../../database/database.service";
import {AddSettlementInput} from "../../admin/settlement/dto/add-settlement.input";
import {UpdateSettlementInput} from "../../admin/settlement/dto/update-settlement.input";

@Injectable()
export class SettlementService {
    constructor(
        private databaseService: DatabaseService,
        private shareService: ShareService
    ) {
    }

    async totalSettlement(payload, query) {
        return await this.shareService.banktransferSerivce.settlement.getTotalSettlement(payload, query)
    }

    async findSettlement(payload, query, page: number = 1, rows: number = 20) {
        return await this.shareService.banktransferSerivce.settlement.getDataSettlement(payload, query, page, rows)
    }

    async addSettlement(payload, body: AddSettlementInput) {
        const getCustomer = await this.databaseService.customerRepository.findOne({
            where: {
                id: body.customer_id,
                isDelete: false
            }
        })
        if (!getCustomer) {
            throw new InternalServerErrorException({
                code: 500,
                message: 'Have not customer'
            })
        }
        const checkBanktype = await this.databaseService.typebankRepository.findOne({
            where: {
                id: body.to_banking
            }
        })
        if (!checkBanktype) {
            throw new InternalServerErrorException({
                code: 500,
                message: 'Have not type bank id'
            })
        }

        const Model = {
            banktypeId: body.to_banking,
            bankaccount: body.account,
            bankname: body.name,
            price: body.price,
            customerId: body.customer_id,
            orderid: body.orderid,
            status: 'wait',
            noMdr: body.no_mdr,
            noFee: body.no_fee
        }
        const Create = await this.databaseService.settlementRepository.create(Model)
        const Result = await this.databaseService.settlementRepository.insert(Create)
        const resultInsert = await this.databaseService.settlementRepository.findOne(Result.raw.insertId)
        await this.shareService.saveLogOrder(payload, resultInsert, 'settlement')
        return {
            id: Result.raw.insertId,
            success: true
        }
    }

    async exportSettlement(payload, query) {
        const getUser = await this.databaseService.managerRepository.findOne(payload.id)
        if (!getUser.email) {
            throw new BadRequestException({
                code: 400,
                message: 'You have not email'
            })
        }

        const idExport = moment().format('YYYYMMDDHHmmss')

        return {
            id: idExport
        }
    }

    async updateSettlement(payload, body: UpdateSettlementInput) {
        const getData = await this.databaseService.settlementRepository.findOne(body.id)
        if (!getData) {
            throw new InternalServerErrorException({
                code: 500,
                message: 'Not have id'
            })
        }
        const Result = await this.shareService.banktransferSerivce.settlement.updateSettlement(payload, body.id, body.status, body.comment)
        return {
            id: Result.id,
            success: true
        }
    }

}
