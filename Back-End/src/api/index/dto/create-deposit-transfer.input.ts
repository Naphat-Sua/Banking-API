import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Matches, Validate} from "class-validator";
import BankTypeArray from "../../../dto/BankTypeArray";
import CheckFromAccount from "../../../dto/CheckAccountBank";
import {CheckNumber} from "../../../dto/CheckNumber";


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
    @Validate(CheckNumber)
    price: number

    @ApiProperty({
        required: false,
        description: 'Bank account number to be deposited'
    })
    @IsString()
    @IsOptional()
    @Matches(CheckFromAccount, {
        message: 'Please input only number'
    })
    account?: string

    @ApiProperty({
        description: 'Bank account number used for payment'
    })
    @IsString()
    @Matches(CheckFromAccount, {
        message: 'Please input only number'
    })
    from_account: string

    @ApiProperty({
        enum: BankTypeArray,
        description: 'Bank used for payment'
    })
    @IsString()
    @IsEnum(BankTypeArray)
    from_bank: string

    @ApiProperty({
        required: false,
        description: 'Name of the owner of the bank account used for payment'
    })
    @IsString()
    @IsOptional()
    from_name?: string

    @ApiProperty({
        required: false,
        description: `Regular customers have to encrypt their data, if they don't want to encrypt their data please contact our team.`
    })
    @IsOptional()
    @IsString()
    signature?: string

}
