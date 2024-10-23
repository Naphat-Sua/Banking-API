import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {ManagerGuard} from "../../auth/Manager.guard";
import {ApiBearerAuth, ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ErrorOutput} from "../../dto/Error.output";
import {SelectService} from "./select.service";

@UseGuards(AuthGuard(), ManagerGuard)
@ApiTags('Manager')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('manager/select')
export class SelectController {

    constructor(
        private selectService: SelectService
    ) {
    }

    @Get('customer')
    selectCustomer() {
        return this.selectService.selectCustomer()
    }

    @Get('accountbank')
    selectAccount(@Query() query) {
        return this.selectService.selectAccount(query)
    }

    @Get('typebank')
    selelctTypeBank() {
        return this.selectService.selelctTypeBank()
    }

    @Get('operation')
    selectOperation() {
        return this.selectService.selectOperation()
    }
}
