import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {ManagerGuard} from "../../auth/Manager.guard";
import {ApiBearerAuth, ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ErrorOutput} from "../../dto/Error.output";
import {CustomerService} from "./customer.service";

@UseGuards(AuthGuard(), ManagerGuard)
@ApiTags('Manager')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('manager/customer')
export class CustomerController {
    constructor(
        private customerService: CustomerService
    ) {
    }

    @Get('balance')
    customerTotalAndBalance(@Query() query, @Query('page') page: number, @Query('rows') rows: number) {
        return this.customerService.customerTotalAndBalance(query, page, rows)
    }
}
