import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { checkPaymentStatus } from '../util/check-payment.utils';
import { PrismaService } from '../prisma/prisma.service';

jest.mock('src/util/check-payment.utils');

describe('OrderService', () => {
  let service: OrderService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: PrismaService,
          useValue: {
            order: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an order if payment is successful', async () => {
      const createOrderDto: CreateOrderDto = {
        buyer: 'John Doe',
        price: 800,
        status: 'COMPLETED',
        shippingAddress: '123 Main St',
        paymentMethod: 'CREDIT_CARD',
        notes: 'Please handle with care',
        promo: true,
      };

      (checkPaymentStatus as jest.Mock).mockResolvedValue(true);
      (prismaService.order.create as jest.Mock).mockResolvedValue(
        createOrderDto,
      );

      const result = await service.create(createOrderDto);

      expect(result).toEqual({
        message: 'Order created successfully',
        order: createOrderDto,
      });
      expect(prismaService.order.create).toHaveBeenCalledWith({
        data: createOrderDto,
      });
    });

    it('should cancel an order if payment is unsuccessful', async () => {
      const createOrderDto: CreateOrderDto = {
        buyer: 'John Doe',
        price: 800,
        status: 'COMPLETED',
        shippingAddress: '123 Main St',
        paymentMethod: 'CREDIT_CARD',
        notes: 'Please handle with care',
        promo: true,
      };

      (checkPaymentStatus as jest.Mock).mockResolvedValue(false);

      const result = await service.create(createOrderDto);

      expect(result).toEqual({
        message: 'Order canceled due to failed payment',
        order: createOrderDto,
      });
      expect(prismaService.order.create).not.toHaveBeenCalled();
    });
  });
});
