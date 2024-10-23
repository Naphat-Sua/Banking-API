import {BadRequestException, Injectable} from '@nestjs/common';
import {McpaymentDatabaseService} from "../../mcpayment-database/mcpayment-database.service";
import {ConfigService} from "@nestjs/config";
import {ShareService} from "../../share/share.service";

@Injectable()
export class McpaymentService {
    constructor(
        private mcpaymentDb: McpaymentDatabaseService,
        private config: ConfigService,
        private share: ShareService
    ) {
    }

    async callbackCardUpdate(body, query) {
        const getData = await this.mcpaymentDb.order.findOne({
            where: {
                token: body.referenceNo
            }
        })
        if (!getData) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have id'
            })
        }
        const updateData: any = {
            status: body.transactionState && body.transactionState === '2' ? 'success' : 'cancel'
        }

        if (updateData.status === 'success') {
            const getDeal = await this.mcpaymentDb.customerDeal.findOne({
                where: {
                    customerId: getData.customerId,
                    merchantId: getData.merchantId,
                    type: getData.typePayment
                }
            })
            updateData.mdr = getDeal.mdr
        }

        const model = {
            merchantId: getData.merchantId,
            customerId: getData.customerId,
            orderId: getData.id,
            transid: body.transactionId,
            rescode: body.responseCode,
            resmsg: body.responseMsg,
            receiptNumber: body.receiptNumber,
            cardno: body.truncatedPan,
            cardco: body.brandName,
            cardname: body.cardHolderName,
            allDataQuery: JSON.stringify(query),
            allDataBody: JSON.stringify(body)
        }

        const create = await this.mcpaymentDb.callback.create(model)
        await this.mcpaymentDb.callback.insert(create)

        await this.mcpaymentDb.order.update(getData.id, updateData)

        this.share.webhookService.hookToCustomerMcPayment(getData.id)
        this.share.webhookService.notifyFromMcPayment(getData.id)

        return {
            code: 200
        }

    }

    async callbackUpdate(query, body) {
        const getData = await this.mcpaymentDb.order.findOne({
            where: {
                token: body.ref
            },
            relations: ['mcpaymentCallbacks']
        })
        if (!getData) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have id'
            })
        }
        const updateData: any = {
            status: body.rescode && (body.rescode === '0000' || body.rescode === '200') ? 'success' : 'cancel'
        }

        if (body.rescode && (body.rescode === '0000' || body.rescode === '200')) {
            const getDeal = await this.mcpaymentDb.customerDeal.findOne({
                where: {
                    customerId: getData.customerId,
                    merchantId: getData.merchantId,
                    type: getData.typePayment
                }
            })

            updateData.mdr = getDeal.mdr
        }

        const model = {
            merchantId: getData.merchantId,
            orderId: getData.id,
            transid: body.transid,
            rescode: body.rescode,
            resmsg: body.resmsg,
            allDataQuery: JSON.stringify(query),
            allDataBody: JSON.stringify(body)
        }

        const create = await this.mcpaymentDb.callback.create(model)
        await this.mcpaymentDb.callback.insert(create)

        if (getData.mcpaymentCallbacks.length === 0) {
            await this.mcpaymentDb.order.update(getData.id, updateData)
            this.share.webhookService.hookToCustomerMcPayment(getData.id)
        }

        this.share.webhookService.notifyFromMcPayment(getData.id)

        return {
            code: 200
        }
    }

    async redirectCard(res, body) {
        const url = `${this.config.get<string>('redirect_mcpayment')}/return?token=${body.referenceNo}`
        return res.redirect(url)
    }

    async redirect(res, body) {
        const url = `${this.config.get<string>('redirect_mcpayment')}/return?token=${body.ref}`
        return res.redirect(url)
    }
}
