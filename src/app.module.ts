import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './company/company.module';
import { User } from './user/user.entity';
import { Company } from './company/company.entity';
//import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user/user.service';
//import { UserService } from './user/user.service';
@Module({
  imports: [
    ConfigModule.forRoot(),
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
      entities: [User, Company],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [UserService],
})
export class AppModule {}
