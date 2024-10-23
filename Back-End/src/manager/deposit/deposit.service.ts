import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {ShareService} from "../../share/share.service";
import * as moment from "moment-timezone";
import {DatabaseService} from "../../database/database.service";
import {UpdateDepositInput} from "./dto/update-deposit.input";
import {AddDepositInput} from "./dto/add-deposit.input";
import {ResendCallbackInput} from "./dto/resend-callback.input";

@Injectable()
export class DepositService {
    constructor(
        private databaseService: DatabaseService,
        private shareService: ShareService
    ) {
    }

    async totalDeposit(payload, query) {
        return await this.shareService.banktransferSerivce.deposit.getTotalDeposit(payload, query)
    }

    async findDeposit(payload, query, page: number = 1, rows: number = 20) {
        return await this.shareService.banktransferSerivce.deposit.getDataDeposit(payload, query, page, rows)
    }

    async exportDeposit(payload, query) {
        const getUser = await this.databaseService.managerRepository.findOne(payload.id)
        if (!getUser.email) {
            throw new BadRequestException({
                code: 400,
                message: 'You have not email'
            })
        }
        const idExport = moment().format('YYYYMMDDHHmmss')
        this.shareService.banktransferSerivce.deposit.exportDataDeposit(payload, getUser.email, query, idExport)
        return {
            id: idExport
        }
    }

    async findLogsDeposit(body) {
        const getData = await this.databaseService.depositRepository.createQueryBuilder('Deposit')
        await getData.where('Deposit.id = :Id', {Id: body.id})
        await getData.leftJoinAndSelect('Deposit.logsorders', 'logsorders')
        await getData.leftJoinAndSelect('logsorders.admin', 'Admin', 'logsorders.adminId IS NOT NULL')
        await getData.leftJoinAndSelect('logsorders.operation', 'Operation', 'logsorders.operationId IS NOT NULL')
        await getData.leftJoinAndSelect('logsorders.manager', 'Manager', 'logsorders.managerId IS NOT NULL')
        await getData.leftJoinAndSelect('logsorders.autosms', 'Autosms', 'logsorders.autosmsId IS NOT NULL')
        await getData.leftJoinAndSelect('logsorders.customer', 'Customer', 'logsorders.customerId IS NOT NULL')
        const count = await getData.getCount()
        if (count === 0) {
            throw new InternalServerErrorException({
                code: 500,
                message: 'Not have id'
            })
        }
        const finalData = await getData.getOne()
        const Result = []
        if (finalData) {
            for (const x of finalData.logsorders) {
                const model = {
                    id: x.id,
                    role: null,
                    user: null,
                    comment: x.comment,
                    status: x.status === 'success' ? x.status : x.status,
                    createdAt: moment(x.createdAt).toDate(),
                    updatedAt: moment(x.updatedAt).toDate()
                }
                if (x.admin) {
                    model.role = 'Admin'
                    model.user = {
                        id: x.admin.id,
                        name: x.admin.username
                    }
                }
                if (x.operation) {
                    model.role = 'Operation'
                    model.user = {
                        id: x.operation.id,
                        name: x.operation.username
                    }
                }
                if (x.bot) {
                    model.role = 'Bot'
                    if (x.autosms) {
                        model.user = 'AutoSMS'
                    } else if (x.status === 'cancel') {
                        model.user = 'AutoCancel'
                    }
                }
                if (x.manager) {
                    model.role = 'Manager'
                    model.user = {
                        id: x.manager.id,
                        name: x.manager.username
                    }
                }
                if (x.customer) {
                    model.role = 'Customer'
                    model.user = {
                        id: x.customer.id,
                        name: x.customer.username
                    }
                }
                Result.push(model)
            }
        }

        return Result
    }

    async addDeposit(payload, body: AddDepositInput) {
        const getCustomer = await this.databaseService.customerRepository.findOne({
            where: {
                id: body.customer_id,
                isDelete: false
            }
        })
        if (!getCustomer) {
            throw new BadRequestException({
                code: 400,
                message: 'Have not customer id'
            })
        }
        const checkOrderId = await this.databaseService.depositRepository.findOne({
            where: {
                customerId: body.customer_id,
                orderid: body.orderid
            }
        })
        if (checkOrderId) {
            throw new BadRequestException({
                code: 400,
                message: 'You can not use orderid'
            })
        }
        const getAccount = await this.shareService.banktransferSerivce.accountbank.getAccountCustomer(getCustomer.id, false)
        if (getAccount.length === 0) {
            throw new BadRequestException({
                code: 400,
                message: 'Have not account bank'
            })
        }
        const useAccount = body.from_account === 'KBANK' && !body.accountbank_id ? getAccount.filter(value => value.banktype && value.banktype.key === 'KBANK') : getAccount
        const findIndexAccount = body.accountbank_id ? useAccount.findIndex(value => value.id === body.accountbank_id) : Math.floor(Math.random() * useAccount.length)
        if (findIndexAccount < 0) {
            throw new BadRequestException({
                code: 400,
                message: 'Have not account bank id'
            })
        }
        const from = {
            from_account: body.from_account,
            from_name: body.from_name,
            from_bank: body.from_bank
        }
        const callback = body.callback ? body.callback : null
        const Result = body.qrcode ? await this.shareService.banktransferSerivce.deposit.createDepositQrcode(payload, payload.id, useAccount[findIndexAccount].id, body.orderid, body.price, 'Create On Web', callback, body.send_callback) : await this.shareService.banktransferSerivce.deposit.createDepositTransfer(payload, payload.id, useAccount[findIndexAccount].id, body.orderid, body.price, from, 'Create On Web', callback, body.send_callback)
        return {
            id: Result.id,
            token: Result.token,
            status: Result.status
        }
    }

    async updateDeposit(payload, body: UpdateDepositInput) {
        const getData = await this.databaseService.depositRepository.findOne(body.id)
        if (!getData) {
            throw new InternalServerErrorException({
                code: 500,
                message: 'Not have id'
            })
        }
        const Result = await this.shareService.banktransferSerivce.deposit.updateDepsoit(payload, body.id, body.status, body.comment)
        return {
            id: Result.id,
            status: Result.status
        }
    }

    async ResendCallback(body: ResendCallbackInput) {
        const getData = await this.databaseService.depositRepository.findOne(body.id)
        if (!getData) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have id'
            })
        }
        await this.shareService.webhookService.hookToCustomer(getData.id, 'deposit')
        return 'Success'
    }

}
