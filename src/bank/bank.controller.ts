import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BankService } from './bank.service';
import { BankDTO } from 'src/dto/bank.dto';
import { Public } from 'src/public.decorator';
import { Bank } from './bank.entity';

@Controller('banks')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Public()
  @Get()
  async findAll(): Promise<Bank[]> {
    return this.bankService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Bank> {
    return this.bankService.findOne({ where: { id } });
  }

  @Public()
  @Post()
  async createBank(@Body() createBankDto: BankDTO) {
    const newBank = await this.bankService.createBank(createBankDto);
    return newBank;
  }
  @Public()
  @Put(':id')
  async updateBank(@Param('id') id: string, @Body() updateBankDto: BankDTO): Promise<Bank> {
    return this.bankService.updateBank(id, updateBankDto);
  }
  @Public()
  @Delete(':id')
  async deleteBank(@Param('id') id: string) {
    return this.bankService.deleteBank(id);
  }
}
