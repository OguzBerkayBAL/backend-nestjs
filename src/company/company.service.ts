// src/services/company.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CompanyDTO } from '../dto/company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async findAll(): Promise<Company[]> {
    return this.companyRepository.find({
      relations: {
        users: true,
      },
    });
  }

  async create(companyDTO: CompanyDTO): Promise<Company> {
    const company = this.companyRepository.create(companyDTO);
    return this.companyRepository.save(company);
  }

  async update(id: string, updateCompanyDto: CompanyDTO): Promise<Company> {
    await this.companyRepository.update(id, updateCompanyDto);
    const updatedCompany = await this.companyRepository.findOne({
      where: { id },
    });
    if (!updatedCompany) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return updatedCompany;
  }

  async delete(id: string): Promise<void> {
    const result = await this.companyRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
  }
}
