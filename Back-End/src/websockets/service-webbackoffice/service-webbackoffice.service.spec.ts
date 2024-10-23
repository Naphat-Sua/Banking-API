import { Test, TestingModule } from '@nestjs/testing';
import { ServiceWebbackofficeService } from './service-webbackoffice.service';

describe('ServiceWebbackofficeService', () => {
  let service: ServiceWebbackofficeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceWebbackofficeService],
    }).compile();

    service = module.get<ServiceWebbackofficeService>(ServiceWebbackofficeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
