import {Body, Controller, Patch, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {AgentGuard} from "../../auth/Agent.guard";
import {ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ErrorOutput} from "../../dto/Error.output";
import {SettingService} from "./setting.service";
import {EditProfileInput} from "./dto/edit-profile.input";
import {EditProfileOutput} from "./dto/edit-profile.output";
import {ResetPasswordInput} from "./dto/reset-password.input";
import {ResetPasswordOutput} from "./dto/reset-password.output";

@ApiTags('Setting')
@UseGuards(AuthGuard(), AgentGuard)
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('agent/setting')
export class SettingController {
    constructor(
        private settingService: SettingService
    ) {
    }

    @Patch('edit')
    editProfile(@Req() req, @Body() body: EditProfileInput): Promise<EditProfileOutput> {
        return this.settingService.editProfile(req.user, body)
    }

    @Patch('resetpassword')
    resetPassword(@Req() req, @Body() body: ResetPasswordInput): Promise<ResetPasswordOutput> {
        return this.settingService.resetPassword(req.uesr, body)
    }
}
