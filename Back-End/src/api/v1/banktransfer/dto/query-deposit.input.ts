import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString} from "class-validator";

export class QueryDepositInput {
    @ApiProperty({
        description: 'Order ID from the service provider system when creating the order.'
    })
    @IsString()
    id: string

    @ApiProperty({
        description: `The customer's order ID when creating the order.`
    })
    @IsString()
    orderid: string

    @ApiProperty({
        description: `Regular customers have to encrypt their data, if they don't want to encrypt their data please contact our team.`
    })
    @IsString()
    @IsOptional()
    signature?: string
}
