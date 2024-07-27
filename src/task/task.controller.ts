import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTask } from './create-task.dto';
import { Public } from 'src/public.decorator';
import { Task } from './task.entity';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}
    @Public()
    @Post()
    createTask(@Body() createTask: CreateTask) {
        return this.taskService.createTask(createTask);
    }

    @Public()
    @Get()
    findAll(): Promise<Task[]> {
        return this.taskService.findAll();
    }

    @Public()
    @Get('test-cron')
    testCron() {
        return this.taskService.handleCron();
    }
}
