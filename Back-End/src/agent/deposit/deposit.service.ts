import {BadRequestException, Injectable} from '@nestjs/common';
import {ShareService} from "../../share/share.service";
import {DatabaseService} from "../../database/database.service";
import * as moment from "moment-timezone";
import {GetTotalDepositOutput} from "./dto/get-total-deposit.output";
import {GetDepositOut} from "./dto/get-deposit.output";
import {ExportOutput} from "./dto/export.output";

@Injectable()
export class DepositService {
    constructor(
        private shareService: ShareService,
        private databaseService: DatabaseService
    ) {
    }

    async totalDeposit(payload, query): Promise<GetTotalDepositOutput> {
        return this.shareService.banktransferSerivce.deposit.getTotalDeposit(payload, query)
    }

    async findDeposit(payload, query, page: number = 1, rows: number = 20): Promise<GetDepositOut> {
        return this.shareService.banktransferSerivce.deposit.getDataDeposit(payload, query, page, rows)
    }

    async exportDeposit(payload, query): Promise<ExportOutput> {
        const getData = await this.databaseService.agentRepository.findOne(payload.id)
        if (!getData) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have agent id'
            })
        }
        if (getData && !getData.email) {
            throw new BadRequestException({
                code: 400,
                message: 'You have not email'
            })
        }
        const idExport = moment().format('YYYYMMDDHHmmss')
        await this.shareService.banktransferSerivce.deposit.exportDataDeposit(payload, getData.email, query, idExport)
        return {
            id: idExport
        }

    }
}
