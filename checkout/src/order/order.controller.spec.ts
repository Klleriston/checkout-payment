import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { EnumPaymentMethod, EnumStatus } from '@prisma/client';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return the result of OrderService.create', () => {
      const createOrderDto = {
        buyer: 'John Doe',
        price: 800,
        status: EnumStatus.COMPLETED,
        shippingAddress: '123 Main St',
        paymentMethod: EnumPaymentMethod.CREDIT_CARD,
        notes: 'Please handle with care',
        promo: true,
      };

      const expectedResult = {
        message: 'Order created successfully',
        order: createOrderDto,
      };

      (service.create as jest.Mock).mockResolvedValue(expectedResult);

      expect(controller.create(createOrderDto)).resolves.toEqual(
        expectedResult,
      );
      expect(service.create).toHaveBeenCalledWith(createOrderDto);
    });
  });
});
