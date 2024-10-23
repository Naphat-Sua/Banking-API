import {Body, Controller, Get, Patch, Query, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {ApiBearerAuth, ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ErrorOutput} from "../../dto/Error.output";
import {WithdrawService} from "./withdraw.service";
import {OperationGuard} from "../../auth/Operation.guard";
import {UpdateWithdrawInput} from "../../admin/withdraw/dto/update-withdraw.input";

@UseGuards(AuthGuard(), OperationGuard)
@ApiTags('Operation')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('operation/withdraw')
export class WithdrawController {
    constructor(
        private withdrawService: WithdrawService
    ) {
    }

    @Get('total')
    getTotal(@Req() req, @Query() query) {
        return this.withdrawService.totalWithdraw(req.user, query)
    }

    @Get('')
    findWithdraw(@Req() req, @Query() query, @Query('page') page: number, @Query('rows') rows: number) {
        return this.withdrawService.findWithdraw(req.user, query, page, rows)
    }

    @Patch('update')
    updateWithdraw(@Req() req, @Body() body: UpdateWithdrawInput) {
        return this.withdrawService.updateWithdraw(req.user, body)
    }
}
