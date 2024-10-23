import {Controller, Get, Query, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {ManagerGuard} from "../../auth/Manager.guard";
import {ApiBearerAuth, ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ErrorOutput} from "../../dto/Error.output";
import {McpaymentService} from "./mcpayment.service";
import {QueryMcpayment} from "../../admin/mcpayment/dto/query-mcpayment";

@UseGuards(AuthGuard(), ManagerGuard)
@ApiTags('Manager')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('manager/mcpayment')
export class McpaymentController {
    constructor(
        private mcpayment: McpaymentService
    ) {
    }

    @Get('total')
    getTotalBox(@Query() query: QueryMcpayment) {
        return this.mcpayment.totalBox(query)
    }

    @Get('')
    find(@Query() query: QueryMcpayment, @Query('page') page: number, @Query('rows') rows: number) {
        return this.mcpayment.find(query, page, rows)
    }

    @Get('export')
    exportFile(@Req() req, @Query() query: QueryMcpayment) {
        return this.mcpayment.exportFile(req.user, query)
    }
}
