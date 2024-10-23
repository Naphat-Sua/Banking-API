import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {ShareService} from "../../share/share.service";
import {DatabaseService} from "../../database/database.service";
import {UpdateDepositInput} from "../../admin/deposit/dto/update-deposit.input";
import {UpdateDepositOutput} from "../../admin/deposit/dto/update-deposit.output";

@Injectable()
export class DepositService {
    constructor(
        private databaseService: DatabaseService,
        private shareService: ShareService
    ) {
    }

    async totalDeposit(payload, query) {
        return this.shareService.banktransferSerivce.deposit.getTotalDeposit(payload, query)
    }

    async findDeposit(payload, query, page: number = 1, rows: number = 20) {
        return await this.shareService.banktransferSerivce.deposit.getDataDeposit(payload, query, page, rows)
    }

    async updateDeposit(payload, body: UpdateDepositInput): Promise<UpdateDepositOutput> {
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

}
