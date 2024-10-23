import {Body, Controller, Get, Patch, Query, Req, UseGuards} from '@nestjs/common';
import {ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ErrorOutput} from "../../dto/Error.output";
import {AuthGuard} from "@nestjs/passport";
import {OperationGuard} from "../../auth/Operation.guard";
import {DepositService} from "./deposit.service";
import {UpdateDepositInput} from "../../admin/deposit/dto/update-deposit.input";

@ApiTags('Operation')
@UseGuards(AuthGuard(), OperationGuard)
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('operation/deposit')
export class DepositController {
    constructor(
        private depositService: DepositService
    ) {
    }

    @Get('total')
    getTotal(@Req() req, @Query() query) {
        return this.depositService.totalDeposit(req.user, query)
    }

    @Get('')
    findDeposit(@Req() req, @Query() query, @Query('page') page: number, @Query('rows') rows: number) {
        return this.depositService.findDeposit(req.user, query, page, rows)
    }

    @Patch('update')
    updateDeposit(@Req() req, @Body() body: UpdateDepositInput) {
        return this.depositService.updateDeposit(req.user, body)
    }
}
