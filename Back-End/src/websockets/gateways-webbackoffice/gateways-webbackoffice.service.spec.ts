import { Test, TestingModule } from '@nestjs/testing';
import { GatewaysWebbackofficeService } from './gateways-webbackoffice.service';

describe('GatewaysWebbackofficeService', () => {
  let service: GatewaysWebbackofficeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GatewaysWebbackofficeService],
    }).compile();

    service = module.get<GatewaysWebbackofficeService>(GatewaysWebbackofficeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
