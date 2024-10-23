import {Body, Controller, Get, Post, Query, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {ApiBearerAuth, ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ErrorOutput} from "../../dto/Error.output";
import {DepositService} from "./deposit.service";
import {CustomerGuard} from "../../auth/Customer.guard";
import {AddDepositInput} from "./dto/add-deposit.input";

@UseGuards(AuthGuard(), CustomerGuard)
@ApiTags('Customer')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('customer/deposit')
export class DepositController {
    constructor(
        private depositService: DepositService
    ) {
    }

    @Get('total')
    totalDeposit(@Req() req, @Query() query) {
        return this.depositService.totalDeposit(req.user, query)
    }

    @Get('export')
    exportDeposit(@Req() req, @Query() query) {
        return this.depositService.exportDeposit(req.user, query)
    }

    @Get()
    findDeposit(@Req() req, @Query() query, @Query('page') page: number, @Query('rows') rows: number) {
        return this.depositService.findDeposit(req.user, query, page, rows)
    }

    @Post('add')
    addDeposit(@Req() req, @Body() body: AddDepositInput) {
        return this.depositService.addDeposit(req.user, body)
    }

}
