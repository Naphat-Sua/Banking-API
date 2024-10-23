import {Controller, Get, Query, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {AgentGuard} from "../../auth/Agent.guard";
import {ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ErrorOutput} from "../../dto/Error.output";
import {SettlementService} from "./settlement.service";
import {GetTotalSettlementOutput} from "./dto/get-total-settlement.output";
import {GetSettlementOutput} from "./dto/get-settlement.output";
import {ExportSettlementOutput} from "./dto/export-settlement.output";

@ApiTags('Settlement')
@UseGuards(AuthGuard(), AgentGuard)
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('agent/settlement')
export class SettlementController {

    constructor(
        private settlementService: SettlementService
    ) {
    }

    @Get('total')
    totalSettlement(@Req() req, @Query() query): Promise<GetTotalSettlementOutput> {
        return this.settlementService.totalSettlement(req.user, query)
    }

    @Get('')
    findSettlement(@Req() req, @Query() query, @Query('page') page: number, @Query('rows') rows: number): Promise<GetSettlementOutput> {
        return this.settlementService.findSettlement(req.user, query, page, rows)
    }

    @Get('export')
    exportSettlement(@Req() req, @Query() query): Promise<ExportSettlementOutput> {
        return this.settlementService.exportSettlement(req.user, query)
    }


}
