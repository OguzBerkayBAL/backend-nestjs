import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
//import { Login } from './dto/login.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  // @Post('login')
  // async login(@Body() login: Login) {
  //   return this.authService.login(login);
  // }

  //@UseGuards(JwtAuthGuard)
  @Get('info')
  async getUserInfo(@Request() req) {
    return req.user;
  }
}
