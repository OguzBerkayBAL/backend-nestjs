import { Controller, Get, Query } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public } from 'src/public.decorator';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}
    @Public()
    @Get('send')
    async sendMail(
        @Query('to') to: string,
        @Query('subject') subject: string,
        @Query('text') text: string,
    ) {
        await this.mailService.sendMail(to, subject, text);
        return 'Email sent';
    }
}
