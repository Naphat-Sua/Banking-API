import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional, IsString, IsUrl, Matches, Validate} from "class-validator";
import {CheckNumber} from "../../../../../dto/CheckNumber";
import CheckFromAccount from "../../../../../dto/CheckAccountBank";

export class CreateDepositAutoqrcodeInput {
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
