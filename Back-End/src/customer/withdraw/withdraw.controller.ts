import {Body, Controller, Get, Post, Query, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {ApiBearerAuth, ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ErrorOutput} from "../../dto/Error.output";
import {WithdrawService} from "./withdraw.service";
import {CustomerGuard} from "../../auth/Customer.guard";
import {AddWithdrawInput} from "./dto/add-withdraw.input";

@UseGuards(AuthGuard(), CustomerGuard)
@ApiTags('Customer')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('customer/withdraw')
export class WithdrawController {
    constructor(
        private withdrawService: WithdrawService
    ) {
    }

    @Get('total')
    totalWithdraw(@Req() req, @Query() query) {
        return this.withdrawService.totalWithdraw(req.user, query)
    }

    @Get('export')
    exportWithdraw(@Req() req, @Query() query) {
        return this.withdrawService.exportWithdraw(req.user, query)
    }

    @Get('')
    findWithdraw(@Req() req, @Query() query, @Query('page') page: number, @Query('rows') rows: number) {
        return this.withdrawService.findWithdraw(req.user, query, page, rows)
    }

    @Post('add')
    addWithdraw(@Req() req, @Body() body: AddWithdrawInput) {
        return this.withdrawService.addWithdraw(req.user, body)
    }
}
