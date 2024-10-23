import {ApiProperty} from "@nestjs/swagger";
import BankTypeArray from "../../../../dto/BankTypeArray";

export class QueryWithdrawOutput {
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
        description: 'Bank account number for withdrawal'
    })
    account: string

    @ApiProperty({
        enum: BankTypeArray,
        description: 'Bank for withdrawal'
    })
    to_banking: string

    @ApiProperty({
        description: 'Name of bank account holder for withdrawal'
    })
    name: string

    @ApiProperty({
        description: 'Amount for this transaction'
    })
    price: number

    @ApiProperty({
        enum: ['wait', 'success', 'cancel'],
        description: 'Order status'
    })
    status: string

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
