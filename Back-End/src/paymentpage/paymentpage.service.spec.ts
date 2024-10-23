import { Test, TestingModule } from '@nestjs/testing';
import { PaymentpageService } from './paymentpage.service';

describe('PaymentpageService', () => {
  let service: PaymentpageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentpageService],
    }).compile();

    service = module.get<PaymentpageService>(PaymentpageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
