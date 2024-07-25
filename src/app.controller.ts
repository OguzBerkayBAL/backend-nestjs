import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
//import { Login } from './dto/login.dto';

@Controller()
export class AppController {
 
  @Get('info')
  async getUserInfo(@Request() req) {
    return req.user;
  }
}
