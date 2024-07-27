import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public } from 'src/public.decorator';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}
  @Public()
  @Get('send-email')
  async sendEmail() {
    await this.mailService.sendUserConfirmation('berkaybal5@gmail.com');
    return 'Email sent';
  }
  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    await this.mailService.sendPasswordResetCode(email);
    return 'Password reset code sent';
  }
  @Public()
  @Post('reset-password')
  async resetPassword(@Body('email') email: string, @Body('code') code: string, @Body('newPassword') newPassword: string) {
    await this.mailService.resetPassword(email, code, newPassword);
    return 'Password reset successfully';
  }
}
