import {Injectable} from '@nestjs/common';
import {DatabaseService} from "../../database/database.service";
import {McpaymentDatabaseService} from "../../mcpayment-database/mcpayment-database.service";
import {Between, Like} from "typeorm";
import * as moment from "moment-timezone";
import {QueryMcpayment} from "./dto/query-mcpayment";

@Injectable()
export class McpaymentService {

    constructor(
        private database: DatabaseService,
        private mcpaymentDb: McpaymentDatabaseService
    ) {
    }

    async find(payload, query: QueryMcpayment, page: number = 1, rows: number = 20) {
        const skip = (page - 1) * rows
        let Query: any = []
        const getCustomer = await this.database.customerRepository.find({
            where: {
                agentId: payload.id
            },
            withDeleted: true
        })
        Query = getCustomer.map(value => {
            return {
                customer: {
                    mainId: value.id
                }
            }
        })
        if (query.customer_id) {
            Query = Query.filter(value => value.customer.mainId === query.customer_id)
        }
        if (query.orderid) {
            Query = Query.map(value => {
                value.orderid = Like(`%${query.orderid}%`)
                return value
            })
        }
        if (query.currency) {
            Query = Query.map(value => {
                value.currency = query.currency
                return value
            })
        }
        if (query.type_payment) {
            Query = Query.map(value => {
                value.typePayment = query.type_payment
                return value
            })
        }
        if (query.from_create && query.to_create) {
            const startDate = moment(query.from_create + " 00:00:00", "YYYY-MM-DD HH:mm:ss");
            const endDate = moment(query.to_create + " 23:59:59", "YYYY-MM-DD HH:mm:ss");
            if (startDate.isValid() && endDate.isValid()) {
                Query = Query.map(value => {
                    value.createdAt = Between(startDate, endDate);
                    return value
                })
            }
        }
        if (query.from_update && query.to_update) {
            const startDate = moment(query.from_update + " 00:00:00", "YYYY-MM-DD HH:mm:ss");
            const endDate = moment(query.to_update + " 23:59:59", "YYYY-MM-DD HH:mm:ss");
            if (startDate.isValid() && endDate.isValid()) {
                Query = Query.map(value => {
                    value.updatedAt = Between(startDate, endDate);
                    return value
                })
            }
        }
        const getData = await this.mcpaymentDb.order.findAndCount({
            where: Query,
            relations: ['customer'],
            take: rows,
            skip
        })

        const result = getData[0].map(value => {
            return {
                id: value.id,
                orderid: value.orderid,
                amount: value.amount,
                currency: value.currency,
                mdr: value.mdr,
                type_payment: value.typePayment,
                customer: value.customer ? {
                    id: value.customer.id,
                    name: value.customer.name
                } : null,
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
}
