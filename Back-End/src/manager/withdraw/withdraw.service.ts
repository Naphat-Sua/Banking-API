import {BadRequestException, Injectable} from '@nestjs/common';
import {ShareService} from "../../share/share.service";
import * as moment from "moment-timezone";
import {DatabaseService} from "../../database/database.service";
import {GetLogsWithdrawInput} from "../../admin/withdraw/dto/get-logs-withdraw.input";
import {UpdateWithdrawInput} from "../../admin/withdraw/dto/update-withdraw.input";
import {ResendcallbackInput} from "../../admin/withdraw/dto/resendcallback.input";

@Injectable()
export class WithdrawService {
    constructor(
        private databaseService: DatabaseService,
        private shareService: ShareService
    ) {
    }

    async totalWithdraw(payload, query) {
        return await this.shareService.banktransferSerivce.withdraw.getTotalWithdraw(payload, query)
    }

    async findWithdraw(payload, query, page: number = 1, rows: number = 20) {
        return await this.shareService.banktransferSerivce.withdraw.getDataWithdraw(payload, query, page, rows)
    }

    async exportWithdraw(payload, query) {
        const getUser = await this.databaseService.managerRepository.findOne(payload.id)
        if (!getUser.email) {
            throw new BadRequestException({
                code: 400,
                message: 'You have not email'
            })
        }
        const idExport = moment().format('YYYYMMDDHHmmss')
        this.shareService.banktransferSerivce.withdraw.exportDataWithdraw(payload, getUser.email, query, idExport)
        return {
            id: idExport
        }
    }

    async findLogWithdraw(body: GetLogsWithdrawInput) {
        const getData = await this.databaseService.withdrawRepository.createQueryBuilder('Withdraw')
        await getData.where('Withdraw.id = :Id', {Id: Number(body.id)})
        await getData.leftJoinAndSelect('Withdraw.logsorders', 'logsorders')
        await getData.leftJoinAndSelect('logsorders.admin', 'Admin', 'logsorders.adminId IS NOT NULL')
        await getData.leftJoinAndSelect('logsorders.operation', 'Operation', 'logsorders.operationId IS NOT NULL')
        await getData.leftJoinAndSelect('logsorders.manager', 'Manager', 'logsorders.managerId IS NOT NULL')
        await getData.leftJoinAndSelect('logsorders.autosms', 'Autosms', 'logsorders.autosmsId IS NOT NULL')
        await getData.leftJoinAndSelect('logsorders.customer', 'Customer', 'logsorders.customerId IS NOT NULL')
        const Count = await getData.getCount()
        if (Count === 0) {
            throw new BadRequestException({
                code: 400,
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
                    status: x.status,
                    comment: x.comment,
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

    async updateWithdraw(payload, body: UpdateWithdrawInput) {
        const getData = await this.databaseService.withdrawRepository.findOne(body.id)
        if (!getData) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have id'
            })
        }
        const ResultSave = await this.shareService.banktransferSerivce.withdraw.updateWithdraw(payload, body.id, body.status, body.comment)
        return ResultSave

    }

    async ResendCallback(body: ResendcallbackInput) {
        const getData = await this.databaseService.withdrawRepository.findOne(body.id)
        if (!getData) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have id'
            })
        }
        await this.shareService.webhookService.hookToCustomer(getData.id, 'withdraw')
        return {
            success: true
        }
    }
}
