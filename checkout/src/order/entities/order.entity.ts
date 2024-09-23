import { EnumPaymentMethod, EnumStatus } from '@prisma/client';

export class Order {
  id: string;
  buyer: string;
  price: number;
  status: EnumStatus;
  shippingAddress: string;
  paymentMethod: EnumPaymentMethod;
  notes?: string;
  promo: boolean;
}
