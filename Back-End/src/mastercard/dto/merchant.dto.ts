import { IsNotEmpty, IsString } from 'class-validator';

export class MerchantDto {
  @IsNotEmpty({ message: 'Merchant ID must not be empty' })
  @IsString({ message: 'Merchant ID must be a string' })
  merchantId: string;

  @IsNotEmpty({ message: 'Merchant name must not be empty' })
  @IsString({ message: 'Merchant name must be a string' })
  merchantName: string;

  @IsNotEmpty({ message: 'API key must not be empty' })
  @IsString({ message: 'API key must be a string' })
  apiKey: string;

  @IsNotEmpty({ message: 'Merchant URL must not be empty' })
  @IsString({ message: 'Merchant URL must be a string' })
  merchantUrl: string;

  @IsNotEmpty({ message: 'Email must not be empty' })
  @IsString({ message: 'Email must be a string' })
  email: string;

  @IsNotEmpty({ message: 'Password must not be empty' })
  @IsString({ message: 'Password must be a string' })
  password: string;
  
  @IsString({ message: 'Line ID URL must be a string' })
  lineId: string;
  @IsString({ message: 'Telegram ID URL must be a string' })
  telegramId: string;
}
