import { Test, TestingModule } from '@nestjs/testing';
import { PaymentpageController } from './paymentpage.controller';

describe('PaymentpageController', () => {
  let controller: PaymentpageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentpageController],
    }).compile();

    controller = module.get<PaymentpageController>(PaymentpageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
