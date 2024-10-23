import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {McpaymentDatabaseService} from "../../../mcpayment-database/mcpayment-database.service";
import {Between, Like} from "typeorm";
import * as moment from "moment-timezone";
import {Parser} from 'json2csv'
import {ShareService} from "../../share.service";

@Injectable()
export class ExportService {

    constructor(
        private mcDatabase: McpaymentDatabaseService,
        @Inject(forwardRef(() => ShareService))
        private share: ShareService,
    ) {
    }

    async exportOrder(payload, query, email, id) {
        const Query: any = {}
        if (payload.role === 'customer') {
            Query.customer = {
                mainId: payload.id
            }
        }
        if (query.merchant_id) {
            Query.merchantId = query.merchant_id
        }
        if (query.customer_id) {
            Query.customer = {
                mainId: query.customer_id
            }
        }
        if (query.status) {
            Query.status = query.status
        }
        if (query.currency) {
            Query.currency = query.currency
        }
        if (query.type_payment) {
            Query.typePayment = query.type_payment
        }
        if (query.orderid) {
            Query.orderid = Like(`%${query.orderid}%`)
        }
        if (query.from_create && query.to_create) {
            const startDate = moment(query.from_create, "YYYY-MM-DD").startOf('day')
            const endDate = moment(query.to_create, "YYYY-MM-DD").endOf('day')
            if (startDate.isValid() && endDate.isValid()) {
                Query.createdAt = Between(startDate.toDate(), endDate.toDate());
            }
        }
        if (query.from_update && query.to_update) {
            const startDate = moment(query.from_update, "YYYY-MM-DD").startOf('day')
            const endDate = moment(query.to_update, "YYYY-MM-DD").endOf('day')
            if (startDate.isValid() && endDate.isValid()) {
                Query.updatedAt = Between(startDate.toDate(), endDate.toDate());
            }
        }
        const ResultData = []
        let TotalAmount = 0
        let TotalMdr = 0
        let Order = 0

        const getData = await this.mcDatabase.order.find({
            where: Query,
            order: {
                createdAt: 'DESC'
            },
            relations: ['customer', 'merchant']
        })

        for (const x of getData) {
            const model = {
                id: x.id,
                merchant: x.merchant ? `${x.merchant.mid}  (${x.merchant.name})` : null,
                merchant_env: x.merchant ? x.merchant.typeEnv : null,
                customer: x.customer ? x.customer.name : null,
                orderid: x.orderid,
                amount: x.amount,
                currency: x.currency,
                mdr: x.amount * (x.mdr / 100),
                type_payment: x.typePayment,
                status: x.status,
                created_at: moment(x.createdAt).format('YYYY-MM-DD HH:mm:ss Z'),
                updated_at: moment(x.updatedAt).format('YYYY-MM-DD HH:mm:ss Z')
            }
            ResultData.push(model)
            Order += 1
            TotalAmount += x.amount
            TotalMdr += ((x.amount * x.mdr) / 100)
        }
        const json2csvParser = new Parser({withBOM: true});
        const csv = json2csvParser.parse(ResultData);
        const MessageOptionsEmail = {
            to: email,
            subject: `Export MC ${id}`,
            html: `<b>Count Order = ${Order}<br>TotalAmount = ${TotalAmount.toFixed(2)}<br>TotalMdr = ${TotalMdr.toFixed(2)}<br>TotalNetAmount = ${(TotalAmount - TotalMdr).toFixed(2)}</b>`,
            attachments: [
                {
                    filename: `ExportMC_${id}.csv`,
                    content: Buffer.from(csv, 'utf-8')
                }
            ]
        }
        await this.share.emailService.sendEmail(MessageOptionsEmail)
    }
}
