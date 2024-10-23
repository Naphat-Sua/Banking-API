import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl, Validate, ValidateIf} from "class-validator";
import BankTypeArray from "../../../../../dto/BankTypeArray";
import {CheckNumber} from "../../../../../dto/CheckNumber";

const checkFromAccount = /\d{10}/

export class CreateDepositTransferInput {
    @ApiProperty({
        uniqueItems: true,
        description: 'Order ID from customer'
    })
    @IsString()
    orderid: string

    @ApiProperty({
        description: 'Amount for this transaction (2000 = 20.00)'
    })
    @IsNotEmpty()
    @ValidateIf(value => !isNaN(Number(value.price)) && Number(value.price) >= 1000, {
        message: 'price is not a number or not lower 2000'
    })
    @Validate(CheckNumber)
    price: number

    @ApiProperty({
        required: false,
        description: 'Bank account number to be deposited'
    })
    @IsString()
    @IsOptional()
    @ValidateIf(value => value.account && checkFromAccount.test(value.account))
    account?: string

    @ApiProperty({
        description: 'Bank account number used for payment'
    })
    @IsString()
    @IsOptional()
    @ValidateIf(value => value.from_account && checkFromAccount.test(value.from_account))
    from_account?: string

    @ApiProperty({
        enum: BankTypeArray,
        description: 'Bank used for payment'
    })
    @IsString()
    @IsOptional()
    @IsEnum(BankTypeArray)
    from_bank?: string

    @ApiProperty({
        required: false,
        description: 'Name of the owner of the bank account used for payment'
    })
    @IsString()
    @IsOptional()
    from_name?: string

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
    signature: string

    @IsBoolean()
    @IsOptional()
    random_satang?: boolean

    @IsString()
    @IsOptional()
    comment?: string
}
