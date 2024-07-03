import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from './bank.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { BankDTO } from 'src/dto/bank.dto';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank)
    private readonly bankRepository: Repository<Bank>,
  ) {}

  async findAll(): Promise<Bank[]> {
    return this.bankRepository.find({ relations: ['company'] });
  }

  async findOne(options: FindOneOptions<Bank>): Promise<any> {
    const bank = await this.bankRepository.findOne(options);
    return bank;
  }

  async createBank(createBankDto: BankDTO): Promise<Bank> {
    const { companyId, name, balance } = createBankDto;
    const newBank = this.bankRepository.create({ companyId, balance: balance, name });
    return this.bankRepository.save(newBank);
  }

  async updateBank(id: string, updateBankDto: BankDTO): Promise<Bank> {
    await this.bankRepository.update(id, updateBankDto);
    const updatedBank = await this.bankRepository.findOne({ where: { id } });
    if (!updatedBank) {
      throw new NotFoundException(`Bank with ID ${id} not found`);
    }
    //updatedBank.balance = updateBankDto.amount;
    return updatedBank;
  }

  async updateBankBalance(bankId: string, amount: number): Promise<void> {
    const bank = await this.bankRepository.findOne({ where: { id: bankId } });

    if (!bank) {
      throw new NotFoundException(`Bank with ID ${bankId} not found`);
    }

    bank.balance = Number(bank.balance) + amount;
    await this.bankRepository.save(bank);
  }

  async deleteBank(id: string) {
    const bank = await this.bankRepository.findOne({ where: { id } });
    if (!bank) {
      return 'Bu ID ile ilişkili banka bulunamadı.';
    }

    await this.bankRepository.remove(bank);
    return bank;
  }
}
