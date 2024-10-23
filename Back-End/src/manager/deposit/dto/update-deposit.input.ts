import {IsEnum, IsInt, IsOptional, IsString} from "class-validator";

export class UpdateDepositInput {
    @IsInt()
    id: number

    @IsString()
    @IsEnum(['cancel', 'success', 'edit', 'refund'])
    status: string

    @IsString()
    @IsOptional()
    comment?: string
}
