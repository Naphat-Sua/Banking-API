import {BadRequestException, Injectable} from '@nestjs/common';
import {McpaymentDatabaseService} from "../../mcpayment-database/mcpayment-database.service";
import {DatabaseService} from "../../database/database.service";
import {ShareService} from "../../share/share.service";
import {QueryMcpayment} from "../../admin/mcpayment/dto/query-mcpayment";
import {Between, Like} from "typeorm";
import * as moment from "moment-timezone";

@Injectable()
export class McpaymentService {

    constructor(
        private mcDatabase: McpaymentDatabaseService,
        private database: DatabaseService,
        private share: ShareService
    ) {
    }

    async totalBox(query: QueryMcpayment) {
        const Query: any = {}
        if (query.merchant_id) {
            Query.merchantId = query.merchant_id
        }
        if (query.status) {
            Query.status = query.status
        }
        if (query.customer_id) {
            Query.customer = {
                mainId: query.customer_id
            }
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
            const startDate = moment(query.from_create + " 00:00:00", "YYYY-MM-DD HH:mm:ss");
            const endDate = moment(query.to_create + " 23:59:59", "YYYY-MM-DD HH:mm:ss");
            if (startDate.isValid() && endDate.isValid()) {
                Query.createdAt = Between(startDate.toDate(), endDate.toDate());
            }
        }
        if (query.from_update && query.to_update) {
            const startDate = moment(query.from_update + " 00:00:00", "YYYY-MM-DD HH:mm:ss");
            const endDate = moment(query.to_update + " 23:59:59", "YYYY-MM-DD HH:mm:ss");
            if (startDate.isValid() && endDate.isValid()) {
                Query.updatedAt = Between(startDate.toDate(), endDate.toDate());
            }
        }

        const getData = await this.mcDatabase.order.find({
            where: Query,
            order: {
                createdAt: 'DESC'
            },
            relations: ['customer', 'merchant'],
        })

        let totalAmount = 0
        let totalMdr = 0

        for (const x of getData) {
            totalAmount += x.amount
            totalMdr += x.amount * (x.mdr / 100)
        }

        return {
            total_amount: totalAmount,
            total_mdr: totalMdr,
            total_netamount: totalAmount - totalMdr
        }
    }

    async find(query: QueryMcpayment, page: number = 1, rows: number = 20) {
        const skip = (page - 1) * rows
        const Query: any = {}
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
            const startDate = moment(query.from_create + " 00:00:00", "YYYY-MM-DD HH:mm:ss");
            const endDate = moment(query.to_create + " 23:59:59", "YYYY-MM-DD HH:mm:ss");
            if (startDate.isValid() && endDate.isValid()) {
                Query.createdAt = Between(startDate.toDate(), endDate.toDate());
            }
        }
        if (query.from_update && query.to_update) {
            const startDate = moment(query.from_update + " 00:00:00", "YYYY-MM-DD HH:mm:ss");
            const endDate = moment(query.to_update + " 23:59:59", "YYYY-MM-DD HH:mm:ss");
            if (startDate.isValid() && endDate.isValid()) {
                Query.updatedAt = Between(startDate.toDate(), endDate.toDate());
            }
        }
        const getData = await this.mcDatabase.order.findAndCount({
            where: Query,
            order: {
                createdAt: 'DESC'
            },
            relations: ['customer', 'merchant'],
            take: rows,
            skip
        })

        const result = getData[0].map(value => {
            return {
                id: value.id,
                merchant: value.merchant ? {
                    id: value.merchant.id,
                    name: value.merchant.name,
                    mid: value.merchant.mid,
                    env: value.merchant.typeEnv
                } : null,
                customer: value.customer ? {
                    id: value.customer.id,
                    name: value.customer.name
                } : null,
                orderid: value.orderid,
                amount: value.amount,
                currency: value.currency,
                mdr: value.amount * (value.mdr / 100),
                type_payment: value.typePayment,
                status: value.status,
                created_at: moment(value.createdAt).toDate(),
                updated_at: moment(value.updatedAt).toDate()
            }
        })

        return {
            count: getData[1],
            data: result
        }
    }

    async exportFile(payload, query: QueryMcpayment) {
        const getEmail = await this.database.adminRepository.findOne({
            select: ['email'],
            where: {
                id: payload.id
            }
        })
        if (!getEmail || (getEmail && !getEmail.email)) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have email'
            })
        }
        const idExport = moment().format('YYYYMMDDHHmmss')
        this.share.mcpaymentService.exportFile.exportOrder(payload, query, getEmail.email, idExport)
        return {
            id: idExport
        }
    }
}
