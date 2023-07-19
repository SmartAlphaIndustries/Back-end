import { Test, TestingModule } from '@nestjs/testing';
import { RemotePrinterOperatorController } from './remote-printer-operator.controller';
import { RemotePrinterOperatorService } from './remote-printer-operator.service';

describe('RemotePrinterOperatorController', () => {
  let controller: RemotePrinterOperatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemotePrinterOperatorController],
      providers: [RemotePrinterOperatorService],
    }).compile();

    controller = module.get<RemotePrinterOperatorController>(RemotePrinterOperatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
