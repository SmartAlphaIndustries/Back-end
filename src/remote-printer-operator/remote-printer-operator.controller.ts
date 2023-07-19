import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RemotePrinterOperatorService } from './remote-printer-operator.service';
import { CreateRemotePrinterOperatorDto } from './dto/create-remote-printer-operator.dto';
import { UpdateRemotePrinterOperatorDto } from './dto/update-remote-printer-operator.dto';

@Controller('remote-printer-operator')
export class RemotePrinterOperatorController {
  constructor(private readonly remotePrinterOperatorService: RemotePrinterOperatorService) {}

  @Post()
  create(@Body() createRemotePrinterOperatorDto: CreateRemotePrinterOperatorDto) {
    return this.remotePrinterOperatorService.create(createRemotePrinterOperatorDto);
  }

  @Get()
  findAll() {
    return this.remotePrinterOperatorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.remotePrinterOperatorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRemotePrinterOperatorDto: UpdateRemotePrinterOperatorDto) {
    return this.remotePrinterOperatorService.update(+id, updateRemotePrinterOperatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.remotePrinterOperatorService.remove(+id);
  }
}
