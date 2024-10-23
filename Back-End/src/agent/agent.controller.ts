import {Body, Controller, Get, Headers, Ip, Post, Req, UseGuards} from '@nestjs/common';
import {ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ErrorOutput} from "../dto/Error.output";
import {AgentService} from "./agent.service";
import {AuthGuard} from "@nestjs/passport";
import {AgentGuard} from "../auth/Agent.guard";

@ApiTags('Agent')
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('agent')
export class AgentController {
    constructor(
        private agentService: AgentService
    ) {
    }

    @Get('checkauth')
    @UseGuards(AuthGuard(), AgentGuard)
    checkAuth(@Req() req) {
        return {
            status: true
        }
    }

    @Get('profile')
    @UseGuards(AuthGuard(), AgentGuard)
    Profile(@Req() req) {
        return this.agentService.Profile(req.user)
    }

    @Post('login')
    Login(@Body() body, @Headers('x-forwarded-for') XForwardedFor, @Ip() ip) {
        return this.agentService.Login(body, XForwardedFor, ip)
    }
}
