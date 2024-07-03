import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

import { User } from '../user/user.entity';
import { Bank } from 'src/bank/bank.entity';
import { Expense } from 'src/expense/expense.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn() // bunlar her entity(model) de olacak.
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @OneToMany(() => Bank, (bank) => bank.company)
  banks: Bank[];

  @OneToMany(() => Expense, (expense) => expense.company)
  expenses: Expense[];
}
