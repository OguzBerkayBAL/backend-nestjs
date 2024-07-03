// src/controllers/company.controller.ts

import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDTO } from '../dto/company.dto';
import { Public } from 'src/public.decorator';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Public()
  @Get()
  async findAll() {
    return this.companyService.findAll();
  }
  @Public()
  @Post()
  async create(@Body() companyDTO: CompanyDTO) {
    return this.companyService.create(companyDTO);
  }
  @Public()
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCompanyDto: CompanyDTO) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.companyService.delete(id);
  }
}
