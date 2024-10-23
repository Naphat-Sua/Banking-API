// file: create-order.dto.ts

import { IsNotEmpty, IsNumber, IsNumberString, IsString, isNumber } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  @IsNumber()
  amount: string;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
