import {Controller, Get, Query, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {AgentGuard} from "../../auth/Agent.guard";
import {McpaymentService} from "./mcpayment.service";
import {QueryMcpayment} from "./dto/query-mcpayment";

@UseGuards(AuthGuard(), AgentGuard)
@Controller('agent/mcpayment')
export class McpaymentController {
    constructor(
        private mcpayment: McpaymentService
    ) {
    }

    @Get()
    find(@Req() req, @Query() query: QueryMcpayment, @Query('page') page: number, @Query('rows') rows: number) {
        return this.mcpayment.find(req, query, page, rows)
    }
}
