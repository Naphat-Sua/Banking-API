import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsOptional, IsString, IsUrl, Matches, Validate} from "class-validator";
import {CheckNumber} from "../../../../../dto/CheckNumber";
import CheckFromAccount from "../../../../../dto/CheckAccountBank";
import BankTypeArray from "../../../../../dto/BankTypeArray";

export class CreateWithdrawInput {
    @ApiProperty({
        uniqueItems: true,
        description: 'Order ID from customer'
    })
    @IsString()
    orderid: string

    @ApiProperty({
        description: 'Amount for this transaction (2000 = 20.00)'
    })
    @Validate(CheckNumber)
    price: number

    @ApiProperty({
        description: 'Bank account number for withdrawal'
    })
    @IsString()
    @Matches(CheckFromAccount, {
        message: 'Please input only number'
    })
    account: string

    @ApiProperty({
        enum: BankTypeArray,
        description: 'Bank for withdrawal'
    })
    @IsString()
    @IsEnum(BankTypeArray)
    to_banking: string

    @ApiProperty({
        description: 'Name of bank account holder for withdrawal'
    })
    @IsString()
    name: string

    @ApiProperty({
        required: false,
        description: 'Dynamic callback'
    })
    @IsOptional()
    @IsUrl()
    callback_url?: string

    @ApiProperty({
        description: `Regular customers have to encrypt their data, if they don't want to encrypt their data please contact our team.`
    })
    @IsString()
    @IsOptional()
    signature?: string
}
