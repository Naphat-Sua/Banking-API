import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {ShareService} from "../../share/share.service";
import {DatabaseService} from "../../database/database.service";
import {UpdateWithdrawInput} from "../../admin/withdraw/dto/update-withdraw.input";

@Injectable()
export class WithdrawService {
    constructor(
        private databaseService: DatabaseService,
        private shareService: ShareService
    ) {
    }

    async totalWithdraw(payload, query) {
        return this.shareService.banktransferSerivce.withdraw.getTotalWithdraw(payload, query)
    }

    async findWithdraw(payload, query, page: number = 1, rows: number = 20) {
        return await this.shareService.banktransferSerivce.withdraw.getDataWithdraw(payload, query, page, rows)
    }

    async updateWithdraw(payload, body: UpdateWithdrawInput) {
        const getData = await this.databaseService.withdrawRepository.findOne(body.id)
        if (!getData) {
            throw new InternalServerErrorException({
                code: 500,
                message: 'Not have id'
            })
        }
        const Result = await this.shareService.banktransferSerivce.withdraw.updateWithdraw(payload, body.id, body.status, body.comment)
        return {
            id: Result.id,
            status: Result.status
        }

    }

}
