import {ApiProperty} from "@nestjs/swagger";
import {IsInt} from "class-validator";

export class DeleteInput {
    @ApiProperty()
    @IsInt()
    id: number
}
