import {BadRequestException, Injectable} from '@nestjs/common';
import {ShareService} from "../../share/share.service";
import * as moment from "moment-timezone";
import {DatabaseService} from "../../database/database.service";
import {GetTotalSettlementOutput} from "./dto/get-total-settlement.output";
import {GetSettlementOutput} from "./dto/get-settlement.output";
import {ExportSettlementOutput} from "./dto/export-settlement.output";

@Injectable()
export class SettlementService {
    constructor(
        private shareService: ShareService,
        private databaseService: DatabaseService
    ) {
    }

    async totalSettlement(payload, query): Promise<GetTotalSettlementOutput> {
        return this.shareService.banktransferSerivce.settlement.getTotalSettlement(payload, query)
    }

    async findSettlement(payload, query, page, rows): Promise<GetSettlementOutput> {
        return this.shareService.banktransferSerivce.settlement.getDataSettlement(payload, query, page, rows)
    }

    async exportSettlement(payload, query): Promise<ExportSettlementOutput> {
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
        await this.shareService.banktransferSerivce.settlement.exportDataSettlement(payload, getData.email, query, idExport)
        return {
            id: idExport
        }
    }
}
