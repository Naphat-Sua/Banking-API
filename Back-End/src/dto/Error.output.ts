import {ApiProperty} from "@nestjs/swagger";

export class ErrorOutput {
    @ApiProperty()
    code: number

    @ApiProperty()
    message: string
}
