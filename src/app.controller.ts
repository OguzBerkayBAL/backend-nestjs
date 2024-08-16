import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
@Controller()
export class AppController {
 
  @Get('info')
  async getUserInfo(@Request() req) {
    return req.user;
  }
}
