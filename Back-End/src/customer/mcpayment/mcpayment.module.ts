import { Module } from '@nestjs/common';
import { McpaymentController } from './mcpayment.controller';
import { McpaymentService } from './mcpayment.service';

@Module({
  controllers: [McpaymentController],
  providers: [McpaymentService]
})
export class McpaymentModule {}
