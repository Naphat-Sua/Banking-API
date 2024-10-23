import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class WithdrawDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}
