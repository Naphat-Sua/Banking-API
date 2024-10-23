import {ApiProperty} from "@nestjs/swagger";
import BankTypeArray from "../../../../../dto/BankTypeArray";

export class AccountbankOutput {
    @ApiProperty()
    account: string

    @ApiProperty()
    name: string

    @ApiProperty({
        enum: BankTypeArray
    })
    bank: string
}
