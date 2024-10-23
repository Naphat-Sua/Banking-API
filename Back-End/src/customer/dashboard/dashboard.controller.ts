import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {DashboardService} from "./dashboard.service";
import {AuthGuard} from "@nestjs/passport";
import {CustomerGuard} from "../../auth/Customer.guard";
import {ApiBearerAuth, ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ErrorOutput} from "../../dto/Error.output";

@UseGuards(AuthGuard(), CustomerGuard)
@ApiTags('Customer')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('customer/dashboard')
export class DashboardController {
    constructor(
        private dashboardService: DashboardService
    ) {
    }

    @Get('total')
    TotalBox(@Req() req) {
        return this.dashboardService.TotalBox(req.user)
    }

    @Get('total/box/month')
    TotalBoxThisMonth(@Req() req) {
        return this.dashboardService.totalBoxThisMonth(req.user)
    }

    @Get('total/month')
    TotalThisMonth(@Req() req) {
        return this.dashboardService.TotalThisMonth(req.user)
    }

    @Get('chart')
    TotalChart(@Req() req) {
        return this.dashboardService.TotalChart(req.user)
    }
}
