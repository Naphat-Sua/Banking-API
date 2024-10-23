import {IsString} from "class-validator";

export class EditProfileInput {
    @IsString()
    name?: string

    @IsString()
    email?: string

    @IsString()
    phone?: string
}
