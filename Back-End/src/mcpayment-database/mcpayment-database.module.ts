import {Global, Module} from '@nestjs/common';
import {McpaymentDatabaseService} from './mcpayment-database.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Mcpayment} from "../mcpayment_entities/Mcpayment";
import {McpaymentCallback} from "../mcpayment_entities/McpaymentCallback";
import {McpaymentOrder} from "../mcpayment_entities/McpaymentOrder";
import {McpaymentCustomerDeal} from "../mcpayment_entities/McpaymentCustomerDeal";
import {McpaymentTypePayment} from "../mcpayment_entities/McpaymentTypePayment";
import {McpaymentCustomer} from "../mcpayment_entities/McpaymentCustomer";
import {McpaymentWithdraw} from "../mcpayment_entities/McpaymentWithdraw";
import {McpaymentTotal} from "../mcpayment_entities/McpaymentTotal";

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
            McpaymentCallback, McpaymentCustomer, McpaymentCustomerDeal, Mcpayment, McpaymentOrder, McpaymentTypePayment, McpaymentWithdraw, McpaymentTotal
        ], 'mcpayment')
    ],
    providers: [McpaymentDatabaseService],
    exports: [
        TypeOrmModule,
        McpaymentDatabaseService
    ]
})
export class McpaymentDatabaseModule {
}
