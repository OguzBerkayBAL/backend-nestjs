import { Bank } from "src/bank/bank.entity";
import { Company } from "src/company/company.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Expense {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @Column()
    companyId: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @ManyToOne(()=> Company, (company) => company.expenses)
    company: Company;

    @ManyToOne(() => Bank, (bank) => bank.expenses)
    bank: Bank;
}