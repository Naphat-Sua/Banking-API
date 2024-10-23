import { Test, TestingModule } from '@nestjs/testing';
import { ServiceAutoService } from './service-auto.service';

describe('ServiceAutoService', () => {
  let service: ServiceAutoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceAutoService],
    }).compile();

    service = module.get<ServiceAutoService>(ServiceAutoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
