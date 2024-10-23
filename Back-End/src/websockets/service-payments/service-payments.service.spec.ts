import { Test, TestingModule } from '@nestjs/testing';
import { ServicePaymentsService } from './service-payments.service';

describe('ServicePaymentsService', () => {
  let service: ServicePaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicePaymentsService],
    }).compile();

    service = module.get<ServicePaymentsService>(ServicePaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
