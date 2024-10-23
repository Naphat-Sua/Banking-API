import { Test, TestingModule } from '@nestjs/testing';
import { DatamigrateService } from './datamigrate.service';

describe('DatamigrateService', () => {
  let service: DatamigrateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatamigrateService],
    }).compile();

    service = module.get<DatamigrateService>(DatamigrateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
