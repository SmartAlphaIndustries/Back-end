import { Test, TestingModule } from '@nestjs/testing';
import { RemotePrinterOperatorService } from './remote-printer-operator.service';

describe('RemotePrinterOperatorService', () => {
  let service: RemotePrinterOperatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemotePrinterOperatorService],
    }).compile();

    service = module.get<RemotePrinterOperatorService>(RemotePrinterOperatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
