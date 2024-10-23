import {ApiProperty} from "@nestjs/swagger";
import {AccountbankOutput} from "./accountbank.output";

export class CreateDepositTransferOutput {
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
        description: 'Link to payment page'
    })
    redirect_url: string

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
