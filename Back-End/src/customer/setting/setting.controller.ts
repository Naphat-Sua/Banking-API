import {Body, Controller, Patch, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {ApiBearerAuth, ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ErrorOutput} from "../../dto/Error.output";
import {SettingService} from "./setting.service";
import {CustomerGuard} from "../../auth/Customer.guard";
import {SettingInput} from "./dto/setting.input";
import {SetWebhookInput} from "./dto/set-webhook.input";
import {ResetPasswordInput} from "./dto/reset-password.input";

@UseGuards(AuthGuard(), CustomerGuard)
@ApiTags('Customer')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('customer/setting')
export class SettingController {
    constructor(
        private settingService: SettingService
    ) {
    }

    @Patch('profile')
    Setting(@Req() req, @Body() body: SettingInput) {
        return this.settingService.Setting(req.user, body)
    }

    @Patch('webhook')
    SetWebhook(@Req() req, @Body() body: SetWebhookInput) {
        return this.settingService.SetWebhook(req.user, body)
    }

    @Patch('resetpassword')
    ResetPassword(@Req() req, @Body() body: ResetPasswordInput) {
        return this.settingService.ResetPassword(req.user, body)
    }
}
