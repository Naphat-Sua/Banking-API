import {Injectable} from '@nestjs/common';
import {DepositService} from "./deposit/deposit.service";
import {WithdrawService} from "./withdraw/withdraw.service";
import {SettlementService} from "./settlement/settlement.service";
import {CalculateService} from "./calculate/calculate.service";
import {AccountbankService} from "./accountbank/accountbank.service";
import * as crypto from "crypto";
import {ReportService} from "./report/report.service";
import {CovertMessageAutoService} from "./covert-message-auto/covert-message-auto.service";


@Injectable()
export class BanktransferService {
    constructor(
        public deposit: DepositService,
        public withdraw: WithdrawService,
        public settlement: SettlementService,
        public calculate: CalculateService,
        public accountbank: AccountbankService,
        public report: ReportService,
        public covertMessageAuto: CovertMessageAutoService
    ) {
    }

    checkJson(data) {
        try {
            JSON.parse(data);
        } catch (e) {
            return false;
        }
        return true;
    }

    encryptSignatureMD5(secretkey, body) {
        const sortdata = Object.keys(body).sort()
        let msg = ''
        for (const x of sortdata) {
            msg += `${x}=${typeof body[x] === 'object' && this.checkJson(body[x]) ? JSON.stringify(body[x]) : body[x]}&`
        }
        msg += `key=${secretkey}`
        return crypto.createHash('MD5').update(msg).digest('hex')
    }

}
