import {Body, Controller, Get, Headers, Ip, Post, Req, UseGuards} from '@nestjs/common';
import {OperationService} from "./operation.service";
import {AuthGuard} from "@nestjs/passport";
import {LoginInput} from "../dto/Login.input";
import {OperationGuard} from "../auth/Operation.guard";
import {ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ErrorOutput} from "../dto/Error.output";

@ApiTags('Operation')
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('operation')
export class OperationController {
    constructor(
        private operationService: OperationService
    ) {
    }

    @Get('checkauth')
    @UseGuards(AuthGuard(), OperationGuard)
    checkAuth(@Req() req) {
        return this.operationService.checkAuth(req.user)
    }

    @Get('profile')
    @UseGuards(AuthGuard(), OperationGuard)
    Profile(@Req() req) {
        return this.operationService.Profile(req.user)
    }

    @Post('login')
    Login(@Body() body: LoginInput, @Headers('x-forwarded-for') XForwardedFor, @Ip() ip) {
        return this.operationService.Login(body, XForwardedFor, ip)
    }
}
