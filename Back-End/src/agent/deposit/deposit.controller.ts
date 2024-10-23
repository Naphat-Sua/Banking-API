import {Controller, Get, Query, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {AgentGuard} from "../../auth/Agent.guard";
import {ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ErrorOutput} from "../../dto/Error.output";
import {DepositService} from "./deposit.service";

@ApiTags('Deposit')
@UseGuards(AuthGuard(), AgentGuard)
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('agent/deposit')
export class DepositController {
    constructor(
        private depositService: DepositService
    ) {
    }

    @Get('total')
    totalDeposit(@Req() req, @Query() query) {
        return this.depositService.totalDeposit(req.user, query)
    }

    @Get('')
    findDeposit(@Req() req, @Query() query, @Query('page') page: number, @Query('rows') rows: number) {
        return this.depositService.findDeposit(req.user, query, page, rows)
    }

    @Get('export')
    exportDeposit(@Req() req, @Query() query) {
        return this.depositService.exportDeposit(req.user, query)
    }
}
