import { PartialType } from '@nestjs/swagger';
import { CreateRemotePrinterOperatorDto } from './create-remote-printer-operator.dto';

export class UpdateRemotePrinterOperatorDto extends PartialType(CreateRemotePrinterOperatorDto) {}
