import {IsString} from "class-validator";

export class QueryInput {
    @IsString()
    id: string

    @IsString()
    orderid: string

    @IsString()
    signature: string
}
