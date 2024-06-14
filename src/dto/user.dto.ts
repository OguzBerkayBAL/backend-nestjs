// src/dtos/user.dto.ts

import { IsString, IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  @IsUUID()
  CompanyId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
