import {Body, Controller, Get, Post, Query, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {ApiBearerAuth, ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ErrorOutput} from "../../dto/Error.output";
import {SettlementService} from "./settlement.service";
import {CustomerGuard} from "../../auth/Customer.guard";
import {AddSettlementInput} from "./dto/add-settlement.input";

@UseGuards(AuthGuard(), CustomerGuard)
@ApiTags('Customer')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('customer/settlement')
export class SettlementController {
    constructor(
        private settlementService: SettlementService
    ) {
    }

    @Get('total')
    totalSettlement(@Req() req, @Query() query) {
        return this.settlementService.totalSettlement(req.user, query)
    }

    @Get('export')
    exportSettlement(@Req() req, @Query() query) {
        return this.settlementService.exportSettlement(req.user, query)
    }

    @Get('')
    findSettlement(@Req() req, @Query() query, @Query('page') page: number, @Query('rows') rows: number) {
        return this.settlementService.findSettlement(req.user, query, page, rows)
    }

    @Post('add')
    addSettlement(@Req() req, @Body() body: AddSettlementInput) {
        return this.settlementService.addSettlement(req.user, body)
    }
}
