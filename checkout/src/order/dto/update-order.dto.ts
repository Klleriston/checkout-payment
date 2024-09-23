import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { EnumStatus, EnumPaymentMethod } from '@prisma/client';

export class UpdateOrderDto {
  @IsString()
  @IsOptional()
  buyer?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsEnum(EnumStatus)
  @IsOptional()
  status?: EnumStatus;

  @IsString()
  @IsOptional()
  shippingAddress?: string;

  @IsEnum(EnumPaymentMethod)
  @IsOptional()
  paymentMethod?: EnumPaymentMethod;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsBoolean()
  @IsOptional()
  promo?: boolean;
}
