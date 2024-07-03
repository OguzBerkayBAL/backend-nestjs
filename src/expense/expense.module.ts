// src/expense/expense.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { Expense } from './expense.entity';
import { BankModule } from '../bank/bank.module';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [TypeOrmModule.forFeature([Expense]), BankModule, CompanyModule],
  providers: [ExpenseService],
  controllers: [ExpenseController],
})
export class ExpenseModule {}
