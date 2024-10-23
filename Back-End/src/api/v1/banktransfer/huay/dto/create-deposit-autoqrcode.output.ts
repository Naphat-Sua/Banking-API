import {ApiProperty} from "@nestjs/swagger";
import {AccountbankOutput} from "./accountbank.output";

class TimeOut {
    @ApiProperty({
        description: 'expiration date'
    })
    days: string

    @ApiProperty({
        description: 'expiration time'
    })
    time: string

    @ApiProperty({
        description: 'expiration time'
    })
    iso: Date
}

export class CreateDepositAutoqrcodeOutput {
    @ApiProperty({
        description: 'ID status'
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
        description: 'Link QR code image for scanning to pay'
    })
    image: string

    images?: string

    @ApiProperty({
        description: 'Link to payment page'
    })
    redirect_url: string

    @ApiProperty({
        type: TimeOut,
        description: 'Scan payment timeout'
    })
    timeout: TimeOut

    @ApiProperty({
        type: AccountbankOutput,
        description: 'Payment bank information'
    })
    accountbank: AccountbankOutput

    @ApiProperty({
        description: 'Provider encryption to verify the data is actually from the provider.'
    })
    signature: string
}
