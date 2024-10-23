import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {CustomerService} from "../../admin/customer/customer.service";
import {AuthGuard} from "@nestjs/passport";
import {OperationGuard} from "../../auth/Operation.guard";
import {ErrorOutput} from "../../dto/Error.output";
import {GetBalanceOutput} from "../../admin/customer/dto/get-balance.output";

@ApiTags('Operation')
@UseGuards(AuthGuard(), OperationGuard)
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('operation/customer')
export class CustomerController {

    constructor(
        private customerService: CustomerService
    ) {
    }

    @Get('balance')
    customerTotalAndBalance(@Query() query, @Query('page') page: number, @Query('rows') rows: number): Promise<GetBalanceOutput> {
        return this.customerService.customerTotalAndBalance(query, page, rows)
    }
}
