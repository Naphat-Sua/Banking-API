import {IsEnum, IsOptional, IsString, Matches} from "class-validator";

export class QueryMcpayment {
    @IsOptional()
    @IsString()
    @IsEnum(['SGD', 'HKD', 'MYR', 'BRD', 'KRW', 'USD', 'AUD', 'EUR', 'GBP', 'JPY'], {
        message: 'Invalid currency'
    })
    currency?: string

    @IsOptional()
    @IsString()
    @IsEnum(['FPX', 'CARD'])
    type_payment?: string

    @IsString()
    @IsEnum(['wait', 'success', 'cancel'])
    @IsOptional()
    status?: string

    @IsString()
    @IsOptional()
    orderid?: string

    @IsString()
    @IsOptional()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Invalid date format"
    })
    from_create?: string;

    @IsString()
    @IsOptional()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Invalid date format"
    })
    to_create?: string;

    @IsString()
    @IsOptional()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Invalid date format"
    })
    from_update?: string;

    @IsString()
    @IsOptional()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Invalid date format"
    })
    to_update?: string;
}
