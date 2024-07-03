import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class BankDTO {
    @IsNotEmpty()
    @IsUUID()
    companyId: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    balance: number;

    
}