// src/expense/expense.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseDTO } from '../expense/expense.dto';
import { Expense } from './expense.entity';
import { Public } from 'src/public.decorator';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}
  @Public()
  @Get()
  findAll(): Promise<Expense[]> {
    return this.expenseService.findAll();
  }
  @Public()
  @Get(':id')
  findOne(@Param('id') id:string): Promise<Expense> {
    return this.expenseService.findOne(id);
  }
  @Public()
  @Post()
  async createExpense(@Body() expenseDto: ExpenseDTO): Promise<Expense> {
    return this.expenseService.createExpense(expenseDto);
  }
}
