import { Test, TestingModule } from '@nestjs/testing';
import { GatewaysPaymentsService } from './gateways-payments.service';

describe('GatewaysPaymentsService', () => {
  let service: GatewaysPaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GatewaysPaymentsService],
    }).compile();

    service = module.get<GatewaysPaymentsService>(GatewaysPaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
