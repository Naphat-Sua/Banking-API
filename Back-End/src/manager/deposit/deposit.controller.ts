import {Body, Controller, Get, Patch, Post, Query, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {ApiBearerAuth, ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ErrorOutput} from "../../dto/Error.output";
import {ManagerGuard} from "../../auth/Manager.guard";
import {DepositService} from "./deposit.service";
import {DetailInput} from "../../admin/dto/Detail.input";
import {AddDepositInput} from "./dto/add-deposit.input";
import {UpdateDepositInput} from "./dto/update-deposit.input";
import {ResendCallbackInput} from "./dto/resend-callback.input";

@UseGuards(AuthGuard(), ManagerGuard)
@ApiTags('Manager')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('manager/deposit')
export class DepositController {
    constructor(
        private depositService: DepositService
    ) {
    }

    @Get('')
    findDeposit(@Req() req, @Query() query, @Query('page') page: number, @Query('rows') rows: number) {
        return this.depositService.findDeposit(req.user, query, page, rows)
    }

    @Get('total')
    totalDeposit(@Req() req, @Query() query) {
        return this.depositService.totalDeposit(req.user, query)
    }

    @Get('export')
    exportDeposit(@Req() req, @Query() query) {
        return this.depositService.exportDeposit(req.user, query)
    }

    @Post('logs')
    findLogsDeposit(@Body() body: DetailInput) {
        return this.depositService.findLogsDeposit(body)
    }

    @Post('add')
    addDeposit(@Req() req, @Body() body: AddDepositInput) {
        return this.depositService.addDeposit(req.user, body)
    }

    @Patch('update')
    updateDeposit(@Req() req, @Body() body: UpdateDepositInput) {
        return this.depositService.updateDeposit(req.user, body)
    }

    @Post('resendcallback')
    ResendCallback(@Body() body: ResendCallbackInput) {
        return this.depositService.ResendCallback(body)
    }


}
