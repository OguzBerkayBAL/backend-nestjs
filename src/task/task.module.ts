import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/user/user.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User]), ScheduleModule.forRoot(),
    MailModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
