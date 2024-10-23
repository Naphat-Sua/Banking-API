import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";
import {OperationGuard} from "../../auth/Operation.guard";
import {ErrorOutput} from "../../dto/Error.output";
import {SelectService} from "./select.service";

@ApiTags('Operation')
@UseGuards(AuthGuard(), OperationGuard)
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('operation/select')
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
}
