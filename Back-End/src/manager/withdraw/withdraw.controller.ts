import {Body, Controller, Get, Patch, Post, Query, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {ApiBearerAuth, ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ErrorOutput} from "../../dto/Error.output";
import {ManagerGuard} from "../../auth/Manager.guard";
import {WithdrawService} from "./withdraw.service";
import {GetLogsWithdrawInput} from "../../admin/withdraw/dto/get-logs-withdraw.input";
import {UpdateWithdrawInput} from "../../admin/withdraw/dto/update-withdraw.input";
import {ResendcallbackInput} from "../../admin/withdraw/dto/resendcallback.input";

@UseGuards(AuthGuard(), ManagerGuard)
@ApiTags('Manager')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('manager/withdraw')
export class WithdrawController {
    constructor(
        private withdrawService: WithdrawService
    ) {
    }


    @Get('total')
    totalWithdraw(@Req() req, @Query() query) {
        return this.withdrawService.totalWithdraw(req.user, query)
    }

    @Get('')
    findWithdraw(@Req() req, @Query() query, @Query('page') page: number, @Query('rows') rows: number) {
        return this.withdrawService.findWithdraw(req.user, query, page, rows)
    }

    @Get('export')
    exportWithdraw(@Req() req, @Query() query) {
        return this.withdrawService.exportWithdraw(req.user, query)
    }

    @Post('logs')
    findLogWithdraw(@Body() body: GetLogsWithdrawInput) {
        return this.withdrawService.findLogWithdraw(body)
    }

    @Patch('update')
    updateWithdraw(@Req() req, @Body() body: UpdateWithdrawInput) {
        return this.withdrawService.updateWithdraw(req.user, body)
    }

    @Post('resendcallback')
    ResendCallback(@Body() body: ResendcallbackInput) {
        return this.withdrawService.ResendCallback(body)
    }

}
