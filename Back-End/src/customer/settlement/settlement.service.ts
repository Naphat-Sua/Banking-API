import {BadRequestException, Injectable} from '@nestjs/common';
import {ShareService} from "../../share/share.service";
import * as moment from "moment-timezone";
import {DatabaseService} from "../../database/database.service";
import {AddSettlementInput} from "./dto/add-settlement.input";

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

    async exportSettlement(payload, query) {
        const getUser = await this.databaseService.customerRepository.findOne(payload.id)
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


    async addSettlement(payload, body: AddSettlementInput) {
        if (body.orderid) {
            const checkOrderId = await this.databaseService.settlementRepository.findOne({
                where: {
                    orderid: body.orderid,
                    customerId: payload.id
                }
            })
            if (checkOrderId) {
                throw new BadRequestException({
                    code: 400,
                    message: 'You cannot use orderid'
                })
            }
        }
        const calBalance = await this.shareService.banktransferSerivce.calculate.balanceCustomer(payload.id)
        if (body.price > calBalance) {
            throw new BadRequestException({
                code: 400,
                message: 'You don\'t have enough available funds to settlement.'
            })
        }
        const getTypeBank = await this.databaseService.typebankRepository.findOne(body.to_banking)
        if (!getTypeBank) {
            throw new BadRequestException({
                code: 400,
                message: 'Have not type bank id'
            })
        }
        const Model = {
            banktypeId: getTypeBank.id,
            bankaccount: body.account,
            bankname: body.name,
            price: body.price,
            orderid: body.orderid ? body.orderid : moment().format('YYYYMMDDHHmmss'),
            customerId: payload.id,
            status: 'wait',
        }
        const Create = await this.databaseService.settlementRepository.create(Model)
        const Result = await this.databaseService.settlementRepository.insert(Create)
        const resultInsert = await this.databaseService.settlementRepository.findOne(Result.raw.insertId)
        await this.shareService.webSocketsSerivce.serviceWebbackoffice.emitSocketCreate('settlement', Result.raw.insertId)
        await this.shareService.saveLogOrder(payload, resultInsert, 'settlement', 'Create On Web')
        return {
            id: Result.raw.insertId,
            orderid: resultInsert.orderid,
        }

    }
}
