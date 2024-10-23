import {ApiProperty} from "@nestjs/swagger";

export class CheckBalanceOutput {
    @ApiProperty({
        description: 'ID status'
    })
    code: number

    @ApiProperty({
        description: 'Balance in the system'
    })
    balance: number

    @ApiProperty({
        description: 'Random string, must be unique for signature.'
    })
    nonce_str: string

    @ApiProperty({
        description: 'Provider encryption to verify the data is actually from the provider.'
    })
    signature: string
}
