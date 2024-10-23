import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class PaymentDto {
  @IsNotEmpty()
  @IsNumber()
  amount: string;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  customer_email?: string;

  @IsString()
  customer_reference_id?: string;
}
