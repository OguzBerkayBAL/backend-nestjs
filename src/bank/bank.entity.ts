import { Company } from 'src/company/company.entity';
import { Expense } from 'src/expense/expense.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bank {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: number;

  @Column({ nullable: true })
  companyId: string;

  // @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  // amount: number;

  @ManyToOne(() => Company, (company) => company.banks)
  @JoinColumn()
  company: Company;

  @OneToMany(() => Expense, (expense) => expense.bank)
  @JoinColumn()
  expenses: Expense[];
}
