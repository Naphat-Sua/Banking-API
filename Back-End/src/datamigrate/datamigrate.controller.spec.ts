import { Test, TestingModule } from '@nestjs/testing';
import { DatamigrateController } from './datamigrate.controller';

describe('Datamigrate Controller', () => {
  let controller: DatamigrateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatamigrateController],
    }).compile();

    controller = module.get<DatamigrateController>(DatamigrateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
