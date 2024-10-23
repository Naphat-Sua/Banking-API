import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class ExchangeRateDto {
  @IsNotEmpty()
  @IsNumber()
  amount: string;

  @IsNotEmpty()
  @IsString()
  fromCurrency: string;

  @IsNotEmpty()
  @IsString()
  toCurrency: string;

  @IsNotEmpty()
  type: 'BUY' | 'SELL'
}
