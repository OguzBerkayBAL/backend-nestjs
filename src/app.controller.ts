import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { Login } from './dto/login.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() login: Login) {
    return this.authService.login(login);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('info')
  async getUserInfo(@Request() req) {
    return req.user;
  }
}
