import {IsEnum, IsNotEmpty, IsOptional, IsString, Validate} from "class-validator";
import {CheckNumber} from "../../../../../dto/CheckNumber";

export class CreateWithdrawInput {
    @IsString()
    orderid: string

    @IsString()
    @IsEnum(['CARD', 'FPX'], {
        message: 'Invalid payment type'
    })
    type: string

    @IsString()
    @IsEnum(['SGD', 'HKD', 'MYR', 'BRD', 'KRW', 'USD', 'AUD', 'EUR', 'GBP', 'JPY'], {
        message: 'Invalid currency'
    })
    currency: string

    @IsString()
    @IsOptional()
    bank?: string

    @IsString()
    @IsOptional()
    accountbank?: string

    @IsString()
    @IsOptional()
    id_card?: string

    @IsNotEmpty()
    @Validate(CheckNumber)
    price: number

    @IsString()
    signature: string
}
