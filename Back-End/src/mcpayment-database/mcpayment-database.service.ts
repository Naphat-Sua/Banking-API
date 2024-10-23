import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Mcpayment} from "../mcpayment_entities/Mcpayment";
import {McpaymentCallback} from "../mcpayment_entities/McpaymentCallback";
import {McpaymentCustomer} from "../mcpayment_entities/McpaymentCustomer";
import {McpaymentCustomerDeal} from "../mcpayment_entities/McpaymentCustomerDeal";
import {McpaymentOrder} from "../mcpayment_entities/McpaymentOrder";
import {McpaymentTypePayment} from "../mcpayment_entities/McpaymentTypePayment";
import {McpaymentWithdraw} from "../mcpayment_entities/McpaymentWithdraw";
import {McpaymentTotal} from "../mcpayment_entities/McpaymentTotal";

@Injectable()
export class McpaymentDatabaseService {
    constructor(
        @InjectRepository(McpaymentCallback, 'mcpayment')
        public callback: Repository<McpaymentCallback>,
        @InjectRepository(McpaymentCustomer, 'mcpayment')
        public customer: Repository<McpaymentCustomer>,
        @InjectRepository(McpaymentCustomerDeal, 'mcpayment')
        public customerDeal: Repository<McpaymentCustomerDeal>,
        @InjectRepository(Mcpayment, 'mcpayment')
        public mcpayment: Repository<Mcpayment>,
        @InjectRepository(McpaymentOrder, 'mcpayment')
        public order: Repository<McpaymentOrder>,
        @InjectRepository(McpaymentTypePayment, 'mcpayment')
        public typePayment: Repository<McpaymentTypePayment>,
        @InjectRepository(McpaymentWithdraw, 'mcpayment')
        public withdraw: Repository<McpaymentWithdraw>,
        @InjectRepository(McpaymentTotal, 'mcpayment')
        public total: Repository<McpaymentTotal>
    ) {
    }
}
