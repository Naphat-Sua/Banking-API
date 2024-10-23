import {Injectable} from '@nestjs/common';
import * as moment from "moment-timezone";

@Injectable()
export class CovertMessageAutoService {

    scbPinApp(data) {
        const cutFirst = data.txnRemark.split(' ')
        if (data.txnRemark.indexOf('SCB') >= 0) {
            const cutBank = cutFirst[1]
            const cutAccount = cutFirst[2].replace(/x/g, '')
            const cutName = cutFirst[4]
            return {
                time: moment(data.txnDateTime).toDate(),
                amount: data.txnAmount,
                bank: cutBank,
                account: cutAccount,
                name: cutName
            }
        } else {
            const cutBank = cutFirst[1].replace(/\(/g, '').replace(/\)/g, '')
            const cutAccount = cutFirst[2].replace(/\//g, '').replace(/X/g, '')
            return {
                time: moment(data.txnDateTime).toDate(),
                amount: data.txnAmount,
                bank: cutBank,
                account: cutAccount
            }
        }
    }
}
