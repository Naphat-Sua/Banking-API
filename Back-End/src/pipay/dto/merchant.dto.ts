import { IsNotEmpty, IsString } from 'class-validator';

export class MerchantDto {
  @IsNotEmpty({ message: 'Merchant ID must not be empty' })
  @IsString({ message: 'Merchant ID must be a string' })
  merchantId: string;

  @IsNotEmpty({ message: 'Store ID must not be empty' })
  @IsString({ message: 'Store ID must be a string' })
  storeId: string;

  @IsNotEmpty({ message: 'Device ID must not be empty' })
  @IsString({ message: 'Device ID must be a string' })
  deviceId: string;

  @IsNotEmpty({ message: 'Email must not be empty' })
  @IsString({ message: 'Email must be a string' })
  email: string;

  @IsNotEmpty({ message: 'Password must not be empty' })
  @IsString({ message: 'Password must be a string' })
  password: string;
  
  @IsNotEmpty({ message: 'Merchant URL must not be empty' })
  @IsString({ message: 'Merchant URL must be a string' })
  merchantUrl: string;

  @IsString({ message: 'Line ID URL must be a string' })
  lineId: string;
  @IsString({ message: 'Telegram ID URL must be a string' })
  telegramId: string;
}
