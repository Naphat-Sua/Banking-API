import {ApiProperty} from "@nestjs/swagger";
import {IsUrl} from "class-validator";

export class WebhookInput {
    @ApiProperty()
    @IsUrl()
    webhook: string
}
