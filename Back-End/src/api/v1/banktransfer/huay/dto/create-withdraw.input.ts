import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsOptional, IsString, IsUrl, Matches, ValidateIf} from "class-validator";
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
    @ValidateIf(value => !isNaN(Number(value.price)) && Number(value.price) >= 5000, {
        message: 'Enter only numbers and must be greater than 5000.'
    })
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
    callback?: string

    @ApiProperty({
        description: `Regular customers have to encrypt their data, if they don't want to encrypt their data please contact our team.`
    })
    @IsString()
    @IsOptional()
    signature?: string
}
