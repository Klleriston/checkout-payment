import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { EnumStatus, EnumPaymentMethod } from '@prisma/client';

export class CreateOrderDto {
  @IsString()
  buyer: string;

  @IsNumber()
  price: number;

  @IsEnum(EnumStatus)
  status: EnumStatus;

  @IsString()
  shippingAddress: string;

  @IsEnum(EnumPaymentMethod)
  paymentMethod: EnumPaymentMethod;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsBoolean()
  promo: boolean;
}
