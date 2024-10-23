import {IsBoolean, IsEnum, IsInt, IsNumber, IsOptional, IsString, Matches} from "class-validator";
import BankTypeArray from "../../../dto/BankTypeArray";
import CheckFromAccount from '../../../dto/CheckAccountBank'

export class AddDepositInput {
    @IsInt()
    customer_id: number

    @IsString()
    orderid: string

    @IsInt()
    @IsOptional()
    accountbank_id?: number

    @IsNumber()
    price: number

    @IsOptional()
    @IsString()
    @Matches(CheckFromAccount, {
        message: 'Please input only number'
    })
    from_account?: string

    @IsOptional()
    @IsString()
    from_name?: string

    @IsOptional()
    @IsString()
    @IsEnum(BankTypeArray)
    from_bank?: string

    @IsString()
    @IsOptional()
    callback?: string

    @IsBoolean()
    send_callback: boolean

    @IsBoolean()
    qrcode: boolean
}
