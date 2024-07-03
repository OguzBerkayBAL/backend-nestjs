import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from 'src/dto/login.dto';
import { SignUpDto } from 'src/dto/signup.dto';
import { Public } from 'src/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @Post('/login')
  login(@Body() loginDto: Login) {
    return this.authService.login(loginDto);
  }
}
