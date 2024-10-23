import {Controller, Get, Query, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {CustomerGuard} from "../../auth/Customer.guard";
import {McpaymentService} from "./mcpayment.service";
import {QueryMcpayment} from "./dto/query-mcpayment";

@UseGuards(AuthGuard(), CustomerGuard)
@Controller('customer/mcpayment')
export class McpaymentController {
    constructor(
        private mcpayment: McpaymentService
    ) {
    }

    @Get('total')
    getTotal(@Req() req, @Query() query: QueryMcpayment) {
        return this.mcpayment.totalBox(req.user, query)
    }

    @Get()
    find(@Req() req, @Query() query: QueryMcpayment, @Query('page') page: number, @Query('rows') rows: number) {
        return this.mcpayment.find(req.user, query, page, rows)
    }

    @Get('dashboard')
    getDashboard(@Req() req) {
        return this.mcpayment.getBalance(req.user)
    }

    @Get('export')
    exportFile(@Req() req, @Query() query: QueryMcpayment) {
        return this.mcpayment.exportFile(req.user, query)
    }
}
