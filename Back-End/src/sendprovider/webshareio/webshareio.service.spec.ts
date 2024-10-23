import { Test, TestingModule } from '@nestjs/testing';
import { WebshareioService } from './webshareio.service';

describe('WebshareioService', () => {
  let service: WebshareioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebshareioService],
    }).compile();

    service = module.get<WebshareioService>(WebshareioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
