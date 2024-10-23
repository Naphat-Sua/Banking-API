import {IsInt} from "class-validator";

export class ResendCallbackInput {
    @IsInt()
    id: number
}
