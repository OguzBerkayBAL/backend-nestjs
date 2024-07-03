import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Expense } from "./expense.entity";
import { BankService } from "src/bank/bank.service";
import { ExpenseDTO } from "./expense.dto";
import { Repository } from "typeorm";
import { CompanyService } from "src/company/company.service";
import { Company } from "src/company/company.entity";
import { Bank } from "src/bank/bank.entity";

@Injectable()
export class ExpenseService {
    constructor(
        @InjectRepository(Expense)
        private readonly expenseRepository: Repository<Expense>,
         private readonly bankService: BankService,
         private readonly companyService: CompanyService,
    ) {}

    findAll(): Promise<Expense[]> {
        return this.expenseRepository.find();
    }

    findOne(id: string): Promise<Expense> {
        return this.expenseRepository.findOne({ where: {id} })
    }

    async createExpense(expenseDto: ExpenseDTO): Promise<Expense> {
        const { description, amount, companyId, bankId } = expenseDto;
        
        // Company'nin varlığını kontrol et
        const company: Company = await this.companyService.findOne({where:{id: companyId}});
        if (!company) {
            throw new NotFoundException(`Company with ID ${companyId} not found`);
        }

        // Bankanın varlığını kontrol et
        const bank: Bank = await this.bankService.findOne({where:{id: bankId}});
        if (!bank) {
            throw new NotFoundException(`Bank with ID ${bankId} not found`);
        }
    
        // Gideri oluştur ve veritabanına kaydet
        const expense = this.expenseRepository.create({
            description,
            amount,
            company,
            bank,
        });
        await this.expenseRepository.save(expense);

        //Banka bakiyesini güncelle
        await this.bankService.updateBankBalance(bankId, -amount);

         // Güncellenmiş bankayı tekrar al
         const updatedBank = await this.bankService.findOne({where:{id: bankId}});

        // Güncellenmiş balance ile birlikte expense'i döndür
        return {
            ...expense,
            bank: updatedBank
        };
    }
}