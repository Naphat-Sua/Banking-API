import {ApiProperty} from "@nestjs/swagger";

export class CreateWithdrawOutput {
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
}
