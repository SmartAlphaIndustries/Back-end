import { Injectable } from '@nestjs/common';
import { CreateRemotePrinterOperatorDto } from './dto/create-remote-printer-operator.dto';
import { UpdateRemotePrinterOperatorDto } from './dto/update-remote-printer-operator.dto';
import { OctoPrintClient } from "@jamesgopsill/octoprint-client"


const {OCTOPRINT_API_KEY, OCTOPRINT_URL} = process.env


@Injectable()
export class RemotePrinterOperatorService {
  async create(createRemotePrinterOperatorDto: CreateRemotePrinterOperatorDto) {
    
    // Create a new client.
  const client = new OctoPrintClient(OCTOPRINT_URL, OCTOPRINT_API_KEY);

  const response = await client.version()
  if (response.ok) {
      console.log(response.data)
  }
    return 'This action adds a new remotePrinterOperator';
  }

  findAll() {
    return `This action returns all remotePrinterOperator`;
  }

  findOne(id: number) {
    return `This action returns a #${id} remotePrinterOperator`;
  }

  update(id: number, updateRemotePrinterOperatorDto: UpdateRemotePrinterOperatorDto) {
    return `This action updates a #${id} remotePrinterOperator`;
  }

  remove(id: number) {
    return `This action removes a #${id} remotePrinterOperator`;
  }
}
