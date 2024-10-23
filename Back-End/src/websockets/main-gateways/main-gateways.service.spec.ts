import { Test, TestingModule } from '@nestjs/testing';
import { MainGatewaysService } from './main-gateways.service';

describe('MainGatewaysService', () => {
  let service: MainGatewaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainGatewaysService],
    }).compile();

    service = module.get<MainGatewaysService>(MainGatewaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
