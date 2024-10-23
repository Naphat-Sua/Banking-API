import {IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl, Validate} from "class-validator";
import {CheckNumber} from "../../../../../dto/CheckNumber";

export class OrderInput {
    @IsString()
    @IsOptional()
    @IsEnum(['TEST', 'LIVE'])
    env: string

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

    @IsNotEmpty()
    @Validate(CheckNumber)
    price: number

    @IsString()
    @IsOptional()
    @IsEnum(['EN', 'CN', 'KR', 'JP'], {
        message: 'wrong language'
    })
    lang?: string

    @IsString()
    @IsUrl()
    @IsOptional()
    callback?: string

    @IsString()
    @IsUrl()
    @IsOptional()
    redirect_url?: string

    @IsString()
    signature: string
}
