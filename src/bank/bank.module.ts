import { Module } from "@nestjs/common";
import { Bank } from "./bank.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BankService } from "./bank.service";
import { BankController } from "./bank.controller";
import { CompanyModule } from "src/company/company.module";

@Module({
    imports: [TypeOrmModule.forFeature([Bank]), CompanyModule],
    providers: [BankService],
    controllers: [BankController],
    exports: [BankService, TypeOrmModule],
})

export class BankModule {}