import {IsString} from "class-validator";

export class ResetPasswordInput {
    @IsString()
    currentpassword: string

    @IsString()
    newpassword: string

    @IsString()
    confirmnewpassword: string
}
