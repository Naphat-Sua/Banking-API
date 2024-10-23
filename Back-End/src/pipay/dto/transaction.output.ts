// file: start-transaction.dto.ts

import { IsNotEmpty, IsNumber, IsNumberString, IsUrl } from 'class-validator';

export class PiPayStartTransactionDto {
  
  @IsNotEmpty()
  merchantId: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  currency: string;
    
}

export class PiPayVerifyTransactionDto {
    @IsNotEmpty()
    orderID: string;
    @IsNotEmpty()
    processorID: string;
  }
