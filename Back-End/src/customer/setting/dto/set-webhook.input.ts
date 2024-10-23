import {IsUrl} from "class-validator";

export class SetWebhookInput {
    @IsUrl()
    webhook: string
}
