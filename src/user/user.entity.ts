import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Company } from '../company/company.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  //company id

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn() // bunlar her entity(model) de olacak.
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ nullable: true })
  companyId: string;

  @Column({ nullable: true })
  password: string;

  @ManyToOne(() => Company, (company) => company.users)
  @JoinColumn()
  company: Company;
}
