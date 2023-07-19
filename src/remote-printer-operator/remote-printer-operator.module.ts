import { Module } from '@nestjs/common';
import { RemotePrinterOperatorService } from './remote-printer-operator.service';
import { RemotePrinterOperatorController } from './remote-printer-operator.controller';

@Module({
  controllers: [RemotePrinterOperatorController],
  providers: [RemotePrinterOperatorService]
})
export class RemotePrinterOperatorModule {}
