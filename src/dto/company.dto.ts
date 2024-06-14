// src/dtos/company.dto.ts

import { IsString, IsPhoneNumber, Length, IsNotEmpty } from 'class-validator';

export class CompanyDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsPhoneNumber('TR')
  phone: string;

  @IsNotEmpty()
  @Length(11, 13)
  taxNumber: string;
}
