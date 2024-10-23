import { Test, TestingModule } from '@nestjs/testing';
import { GatewaysAutoService } from './gateways-auto.service';

describe('GatewaysAutoService', () => {
  let service: GatewaysAutoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GatewaysAutoService],
    }).compile();

    service = module.get<GatewaysAutoService>(GatewaysAutoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
