import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {McpaymentDatabaseService} from "../../mcpayment-database/mcpayment-database.service";
import {Between, Like} from "typeorm";
import * as moment from "moment-timezone";
import {QueryMcpayment} from "./dto/query-mcpayment";
import {DatabaseService} from "../../database/database.service";
import {ShareService} from "../../share/share.service";

@Injectable()
export class McpaymentService {

    constructor(
        private database: DatabaseService,
        private mcDatabase: McpaymentDatabaseService,
        private share: ShareService
    ) {
    }

    async totalBox(payload, query: QueryMcpayment) {
        const getCustomerId = await this.mcDatabase.customer.findOne({
            select: ['id'],
            where: {
                mainId: payload.id
            }
        })
        if (!getCustomerId) {
            throw new UnauthorizedException()
        }
        const Query: any = {
            customerId: getCustomerId.id
        }
        if (query.currency) {
            Query.currency = query.currency
        }
        if (query.status) {
            Query.status = query.status
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

    async find(payload, query: QueryMcpayment, page: number = 1, rows: number = 20) {
        const skip = (page - 1) * rows
        const getCustomerId = await this.mcDatabase.customer.findOne({
            select: ['id'],
            where: {
                mainId: payload.id
            }
        })
        if (!getCustomerId) {
            throw new UnauthorizedException()
        }
        const Query: any = {
            customerId: getCustomerId.id
        }
        if (query.currency) {
            Query.currency = query.currency
        }
        if (query.status) {
            Query.status = query.status
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

    async getBalance(payload) {
        const getCustomer = await this.database.customerRepository.findOne({
            where: {
                id: payload.id,
                ban: false
            }
        })

        if (!getCustomer) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have customer id'
            })
        }

        const getMcCustomer = await this.mcDatabase.customer.findOne({
            where: {
                mainId: getCustomer.id
            }
        })

        if (!getMcCustomer) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have customer id'
            })
        }
        const getDeal = await this.mcDatabase.customerDeal.find({
            where: {
                customerId: getMcCustomer.id
            },
            relations: ['merchant']
        })

        const result = []

        for (const x of getDeal) {
            const findIndex = result.findIndex(value => value.type === x.type && value.currency === x.currency)
            if (findIndex < 0) {
                result.push({
                    type: x.type,
                    currency: x.currency,
                    balance: 0,
                    deposit: 0,
                    withdraw: 0,
                    mdr: 0,
                })
            }
        }

        const getOrder = await this.mcDatabase.order.find({
            where: {
                customerId: getMcCustomer.id,
                status: 'success'
            }
        })

        for (const x of getOrder) {
            const findIndex = result.findIndex(value => value.type === x.typePayment && value.currency === x.currency)
            if (findIndex >= 0) {
                result[findIndex].deposit += x.amount
                result[findIndex].mdr += ((x.amount * x.mdr) / 100)
                result[findIndex].balance += (x.amount - ((x.amount * x.mdr) / 100))
            }
        }

        const getWithdraw = await this.mcDatabase.withdraw.find({
            where: {
                customerId: getMcCustomer.id,
                status: 'success'
            }
        })

        for (const x of getWithdraw) {
            const findIndex = result.findIndex(value => value.currency === x.currency)
            if (findIndex >= 0) {
                result[findIndex].withdraw += x.amount
                result[findIndex].mdr += ((x.amount * x.mdr) / 100)
                result[findIndex].balance -= (x.amount + ((x.amount * x.mdr) / 100))
            }
        }

        return result

    }

    async exportFile(payload, query: QueryMcpayment) {
        const getEmail = await this.database.customerRepository.findOne({
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
