import {IsBoolean, IsEnum, IsNumber, IsOptional, IsString, IsUrl, Matches} from "class-validator";
import BankTypeArray from "../../../dto/BankTypeArray";
import CheckFromAccount from "../../../dto/CheckAccountBank";

export class AddDepositInput {
    @IsString()
    orderid: string

    @IsBoolean()
    @IsOptional()
    qrcode?: boolean

    @IsNumber()
    price: number

    @IsString()
    @IsOptional()
    @Matches(CheckFromAccount, {
        message: 'Please input only number'
    })
    from_account?: string

    @IsString()
    @IsOptional()
    from_name?: string

    @IsString()
    @IsEnum(BankTypeArray)
    @IsOptional()
    from_bank?: string

    @IsUrl()
    @IsString()
    @IsOptional()
    callback?: string

    @IsBoolean()
    send_callback: boolean
}
