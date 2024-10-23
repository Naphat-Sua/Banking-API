import {IsInt, IsNumber, IsString, Matches, MaxLength, MinLength} from "class-validator";
import CheckAccountBank from '../../../dto/CheckAccountBank'

export class AddSettlementInput {

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
    price: number
}
