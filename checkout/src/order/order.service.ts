import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { checkPaymentStatus } from 'src/util/check-payment.utils';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const paymentSuccess = await checkPaymentStatus(createOrderDto);
    if (!paymentSuccess) {
      return {
        message: 'Order canceled due to failed payment',
        order: createOrderDto,
      };
    }

    const order = await this.prismaService.order.create({
      data: createOrderDto,
    });

    return { message: 'Order created successfully', order };
  }
}
