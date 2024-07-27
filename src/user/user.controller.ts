// src/controllers/user.controller.ts

import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from '../dto/user.dto';
//import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { query } from 'express';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { User } from './user.entity';
import { Public } from 'src/public.decorator';
//import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //@UseGuards(JwtAuthGuard)
  @Public()
  @Get()
  @ApiOperation({ summary: 'Tüm kullanicilari getir.'})
  @ApiResponse({
    status: 200,
    description: 'All data list'
  })
  @ApiResponse({
    status: 403,
    description: 'Fobidden'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.'
  })
  async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<User>> {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Belirli bir kullanıcıyı getir.' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Kullanıcının unique ID\si',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Kullanıcı bulunamadı',
  })
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne({ where: { id } });
  }

  // @Post()
  // @UseGuards(AuthGuard('jwt'))
  // @ApiOperation({summary: 'create new record'})
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       id: {
  //         type: 'integer',
  //         example: 5,
  //         description: 'this is unique id.',
  //       },
  //       name: {
  //         type: 'string',
  //         example: "test",
  //         description: 'this is the name',
  //       },

  //     }
  //   }
  // })
  // @ApiResponse({
  //   status: 201,
  //   description: 'saved...'
  // })
  // @ApiResponse({
  //   status: 403,
  //   description: 'fobidden...'
  // })
  // async createUser(@Body() createUserDto: UserDTO) {
  //   const newUser = await this.userService.createUser(createUserDto);
  //   return newUser;
  // }

  @Put(':id')
  @ApiOperation({ summary: 'update the record'})
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'enter unique id',
    required: true,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        // id: {
        //   type: 'string',
        //   example: '5',
        //   description: 'this is unique id.',
        // },
        name: {
          type: 'string',
          example: "test",
          description: 'this is the name',
        },

      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'updated successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Fobidden',
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UserDTO) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete the record'})
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter unique id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'deleted the record',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
