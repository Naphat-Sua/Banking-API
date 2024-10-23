import { Module } from '@nestjs/common';
import {McpaymentModule} from "./mcpayment/mcpayment.module";

@Module({
    imports: [McpaymentModule]
})
export class ThreePartyModule {}
