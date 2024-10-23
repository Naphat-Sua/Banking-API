import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsString} from "class-validator";

export class Relection {
    @ApiProperty()
    @IsInt()
    id: number

    @ApiProperty()
    @IsString()
    name?: string

    @ApiProperty()
    @IsString()
    username?: string
}
