import {Body, Controller, Get, Patch, Post, Query, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {ApiBearerAuth, ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ErrorOutput} from "../../dto/Error.output";
import {ManagerGuard} from "../../auth/Manager.guard";
import {SettlementService} from "./settlement.service";
import {UpdateSettlementInput} from "../../admin/settlement/dto/update-settlement.input";
import {AddSettlementInput} from "../../admin/settlement/dto/add-settlement.input";

@UseGuards(AuthGuard(), ManagerGuard)
@ApiTags('Manager')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('manager/settlement')
export class SettlementController {
    constructor(
        private settlementService: SettlementService
    ) {
    }

    @Get('')
    findSettlement(@Req() req, @Query() query, @Query('page') page: number, @Query('rows') rows: number) {
        return this.settlementService.findSettlement(req.user, query, page, rows)
    }

    @Get('export')
    exportSettlement(@Req() req, @Query() query) {
        return this.settlementService.exportSettlement(req.user, query)
    }

    @Get('total')
    totalSettlement(@Req() req, @Query() query) {
        return this.settlementService.totalSettlement(req.user, query)
    }

    @Post('add')
    addSettlement(@Req() req, @Body() body: AddSettlementInput) {
        return this.settlementService.addSettlement(req.user, body)
    }

    @Patch('update')
    updateSettlement(@Req() req, @Body() body: UpdateSettlementInput) {
        return this.settlementService.updateSettlement(req.user, body)
    }
}
