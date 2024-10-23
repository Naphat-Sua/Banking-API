import {IsString, IsUrl} from "class-validator";

export class UpdateDepositByslipbankInput {
    @IsString()
    id: string

    @IsString()
    orderid: string

    @IsUrl()
    url_slip: string
}
