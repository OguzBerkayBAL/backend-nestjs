// src/controllers/user.controller.ts

import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from '../dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createUser(@Body() createUserDto: UserDTO) {
    const newUser = await this.userService.createUser(createUserDto);
    return newUser;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UserDTO) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
