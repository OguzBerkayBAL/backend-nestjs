import { Controller, Post, Body, Get } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { NotificationDto } from '../dto/notification.dto';
import { Public } from 'src/public.decorator';

@Controller('notifications')
export class RabbitMQController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}
  @Public()
  @Post('send-notification')
  async sendNotification(@Body() notification: NotificationDto) {
    await this.rabbitMQService.sendNotification(notification);
    return { success: true, message: 'Notification sent!' };
  }
}