import { Test, TestingModule } from '@nestjs/testing';
import { McpaymentController } from './mcpayment.controller';

describe('McpaymentController', () => {
  let controller: McpaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [McpaymentController],
    }).compile();

    controller = module.get<McpaymentController>(McpaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
