import {ApiProperty} from "@nestjs/swagger";
import BankTypeArray from "../../../../dto/BankTypeArray";


class AccountBank {
    @ApiProperty({
        description: 'The bank account number used to receive payments'
    })
    account: string

    @ApiProperty({
        description: 'The name of the bank account used to receive payments.'
    })
    name: string

    @ApiProperty({
        enum: BankTypeArray,
        description: 'The bank used to accept payments'
    })
    bank: string
}

export class QueryDepositOutput {
    @ApiProperty({
        description: 'ID Status'
    })
    code: number

    @ApiProperty({
        description: 'Order ID from service provider'
    })
    id: string

    @ApiProperty({
        description: 'Order ID from customer'
    })
    orderid: string

    @ApiProperty({
        description: 'Amount for this transaction'
    })
    price: number

    @ApiProperty({
        description: 'Is it a QR code?'
    })
    qrcode: boolean

    @ApiProperty({
        enum: ['wait', 'success', 'cancel'],
        description: 'Order status'
    })
    status: string

    @ApiProperty({
        required: false,
        description: 'Bank account number to be deposited'
    })
    from_account?: string

    @ApiProperty({
        enum: BankTypeArray,
        description: 'Bank used for payment'
    })
    from_bank?: string

    @ApiProperty({
        required: false,
        description: 'Name of the owner of the bank account used for payment'
    })
    from_name?: string

    @ApiProperty({
        type: AccountBank,
        description: 'Bank account information used to receive payments'
    })
    account?: AccountBank

    @ApiProperty({
        format: 'ISOString',
        description: 'Order creation time'
    })
    created_at: string

    @ApiProperty({
        format: 'ISOString',
        description: 'Order last update time'
    })
    updated_at: string

    @ApiProperty({
        description: 'Provider encryption to verify the data is actually from the provider.'
    })
    signature: string

}
