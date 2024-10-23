import {
    IsBoolean,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    Matches,
    MaxLength,
    Min,
    MinLength
} from "class-validator";
import CheckAccountBank from '../../../dto/CheckAccountBank'

export class AddWithdrawInput {

    @IsString()
    orderid: string

    @IsString()
    @MinLength(10)
    @MaxLength(10)
    @Matches(CheckAccountBank, {
        message: 'Please input only number'
    })
    account: string

    @IsInt()
    to_banking: number

    @IsString()
    name: string

    @IsNumber()
    @Min(20)
    price: number

    @IsUrl()
    @IsOptional()
    callback?: string

    @IsBoolean()
    send_callback: boolean
}
