import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";
import {AgentGuard} from "../../auth/Agent.guard";
import {ErrorOutput} from "../../dto/Error.output";
import {SelectService} from "./select.service";

@ApiTags('Select')
@UseGuards(AuthGuard(), AgentGuard)
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('agent/select')
export class SelectController {
    constructor(
        private selectSerivce: SelectService
    ) {
    }

    @Get('customer')
    selectCustomer(@Req() req){
        return this.selectSerivce.selectCustomer(req.user)
    }
}
