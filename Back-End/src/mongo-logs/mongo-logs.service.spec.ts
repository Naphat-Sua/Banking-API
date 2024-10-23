import { Test, TestingModule } from '@nestjs/testing';
import { MongoLogsService } from './mongo-logs.service';

describe('MongoLogsService', () => {
  let service: MongoLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoLogsService],
    }).compile();

    service = module.get<MongoLogsService>(MongoLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
