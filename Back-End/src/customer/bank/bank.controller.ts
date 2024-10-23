import {Controller, Get, Query, Req, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ErrorOutput} from "../../dto/Error.output";
import {AuthGuard} from "@nestjs/passport";
import {BankService} from "./bank.service";
import {CustomerGuard} from "../../auth/Customer.guard";
import {GetAccountbankOutput} from "./dto/get-accountbank.output";
import {GetTypebankOutput} from "./dto/get-typebank.output";

@UseGuards(AuthGuard(), CustomerGuard)
@ApiTags('Customer')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('customer/bank')
export class BankController {
    constructor(
        private bankService: BankService
    ) {
    }

    @Get('')
    findBank(@Req() req, @Query() query, @Query('page') page: number, @Query('rows') rows: number): Promise<GetAccountbankOutput> {
        return this.bankService.findBank(req.user, query, page, rows)
    }

    @Get('type')
    typeBank(): Promise<GetTypebankOutput[]> {
        return this.bankService.typeBank()
    }
}
