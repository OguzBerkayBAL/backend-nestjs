import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Between, In, Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { CreateTask } from './create-task.dto';
import { MailService } from 'src/mail/mail.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as cron from 'node-cron';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly mailService: MailService,
    ) {}

    async createTask(createTask: CreateTask): Promise<Task> {
        console.log('Creating task:', createTask);
        const { description, dueDate, assignedUserIds } = createTask;
        const task = new Task();
        task.description = description;
        task.dueDate = new Date(dueDate);
        task.assignedUsers = await this.userRepository.find({
            where: {
                id: In(assignedUserIds),
            },
        });
        // return this.taskRepository.save(task);
        const savedTask = await this.taskRepository.save(task);

        const cronExpression = `${task.dueDate.getUTCMinutes()} ${task.dueDate.getUTCHours()} ${task.dueDate.getUTCDate()} ${task.dueDate.getUTCMonth() + 1} *`;
        console.log(`Cron job scheduled for: ${cronExpression}`);
        cron.schedule(cronExpression, async () => {
            for (const user of task.assignedUsers) {
                await this.mailService.sendTaskDueNotification(user.email, savedTask);
            }
        });

        return savedTask;
    }

    async findTasksDueToday(): Promise<Task[]> {
        console.log('Finding tasks due today');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        console.log('Today:', today);
        return this.taskRepository.find({
            where: {
                dueDate: Between(today, tomorrow),
            },
            relations: ['assignedUsers'],
        });
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleCron() {
        console.log('Running cron job');
        const tasksDueToday = await this.findTasksDueToday();
        console.log('Tasks due today:', tasksDueToday);
        for (const task of tasksDueToday) {
            for (const user of task.assignedUsers) {
                await this.mailService.sendTaskDueNotification(user.email, task);
            }
        }
        console.log('Cron job complete'); 

    }

    async findAll(): Promise<Task[]> {
        console.log('Finding all tasks');
        return this.taskRepository.find({relations: ['assignedUsers']});
    }
}
