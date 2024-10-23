import {IsEmail, IsOptional, IsString} from "class-validator";

export class SettingInput {
    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    phone?: string

    @IsEmail()
    @IsOptional()
    email?: string
}
