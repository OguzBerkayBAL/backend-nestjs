import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './company/company.module';
import { User } from './user/user.entity';
import { Company } from './company/company.entity';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { BankModule } from './bank/bank.module';
import { ExpenseModule } from './expense/expense.module';
import { Bank } from './bank/bank.entity';
import { Expense } from './expense/expense.entity';
import { CacheService } from './cache/cache.service';
import { CacheController } from './cache/cache.controller';
import { RedisOptions } from './common/redis/redis-module';
import { CacheModule } from '@nestjs/cache-manager';
import { MailModule } from './mail/mail.module';
import { TaskModule } from './task/task.module';
import { Task } from './task/task.entity';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { AppService } from './app.service';
import { NotificationConsumer } from './rabbitmq/notificationConsumer.service';
import { RabbitMQController } from './rabbitmq/rabbitmq.controller';
@Module({
  imports: [
    ConfigModule.forRoot( { isGlobal: true } ),
    CacheModule.registerAsync(RedisOptions),
    CompanyModule,
    UserModule,
    JwtModule,
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [User, Company, Bank, Expense, Task],
      synchronize: true,
    }),
    AuthModule,
    BankModule,
    ExpenseModule,
    MailModule,
    TaskModule,
    RabbitMQModule,
  ],
  controllers: [AppController, CacheController, RabbitMQController],
  providers: [AppService, UserService, CacheService, RabbitMQService, NotificationConsumer],
})
export class AppModule {}
