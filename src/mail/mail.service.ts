import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UserService } from 'src/user/user.service';
import { Task } from 'src/task/task.entity';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
import { Subject } from 'rxjs';
import { NotificationDto } from 'src/dto/notification.dto';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
    private readonly rabbitMQService: RabbitMQService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async sendUserConfirmation(email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: 'confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: 'User',
        email: email,
      },
    });
  }

  async sendPasswordResetCode(email: string) {
    const code = Math.floor(100000 + Math.random() * 900000);
    await this.cacheManager.set(email, code, 900);
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset your password',
      template: 'confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        code,
      },
    });
  }

  async resetPassword(email: string, code: string, newPassword: string): Promise<void> {
    const storedCode = await this.cacheManager.get<string>(email);
    console.log(`Stored code: ${storedCode}`);
    console.log(`Provided code: ${code}`);
    if (storedCode !== code) {
      throw new Error('Invalid or expired code');
    }

    await this.userService.updatePassword(email, newPassword);
    await this.cacheManager.del(`password-reset:${email}`);
  }

  async sendTaskDueNotification(email: string, task: Task): Promise<void> {
    const dueDate = new Date(task.dueDate);
    await this.mailerService.sendMail({
      to: email,
      subject: 'Task Due Today',
      template: 'taskDueNotification', 
      context: {
        description: task.description,
        dueDate: dueDate.toDateString(),
      },
    });
  }

  async sendMail(notification: NotificationDto) {
    const { email, message } = notification;

    await this.mailerService.sendMail({
      to: email,
      subject: 'New Notification',
      text: message,
  });

  console.log(`Notification sent to ${email}`);
  }

  

  // async sendNotification() {
  //   try {
  //     const response = await this.rabbitMQService.sendMessage('notifications',[1,2,3]);
  //     console.log('Response from RabbitMQ:', response);
  //   } catch (error) {
  //     console.error('Error sending message to RabbitMQ:', error);
  //   }
  // }
}
