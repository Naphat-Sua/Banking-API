import {Injectable} from '@nestjs/common';
import {CreateDepositAutoqrcodeInput} from "./dto/create-deposit-autoqrcode.input";
import {CreateDepositTransferInput} from "./dto/create-deposit-transfer.input";
import {CreateWithdrawInput} from "./dto/create-withdraw.input";
import {BanktransferService} from "../banktransfer.service";

@Injectable()
export class M88Service {
    constructor(
        private banktransferService: BanktransferService
    ) {
    }

    createOrderDepositQRcode(body: CreateDepositAutoqrcodeInput, Authorization) {
        const model = {
            ...body,
            callback: body.callback_url
        }
        return this.banktransferService.createOrderDepositQRcode(model, Authorization)
    }

    createDepositTransfer(body: CreateDepositTransferInput, Authorization) {
        const model = {
            ...body,
            callback: body.callback_url
        }
        return this.banktransferService.createOrderDeposit(model, Authorization)
    }

    createWithdraw(body: CreateWithdrawInput, Authorization) {
        const model = {
            ...body,
            callback: body.callback_url
        }
        return this.banktransferService.createOrderWithdraw(model, Authorization)
    }
}
