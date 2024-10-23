import {ApiProperty} from "@nestjs/swagger";

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
}
