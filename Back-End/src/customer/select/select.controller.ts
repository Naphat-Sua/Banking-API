import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {ApiBearerAuth, ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ErrorOutput} from "../../dto/Error.output";
import {SelectService} from "./select.service";
import {CustomerGuard} from "../../auth/Customer.guard";

@UseGuards(AuthGuard(), CustomerGuard)
@ApiTags('Customer')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('customer/select')
export class SelectController {
    constructor(
        private selectService: SelectService
    ) {
    }

    @Get('account')
    selectAccountBank(@Req() req) {
        return this.selectService.selectAccountBank(req.user)
    }

    @Get('typebank/string')
    selectStringTypeBank() {
        return this.selectService.selectStringTypeBank()
    }

    @Get('typebank')
    selelctTypeBank() {
        return this.selectService.selelctTypeBank()
    }
}
