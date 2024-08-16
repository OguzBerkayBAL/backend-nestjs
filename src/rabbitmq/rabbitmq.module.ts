import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQService } from './rabbitmq.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'MATH_SERVICE',
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: ['amqp://localhost:5672'],
    //       queue: 'cats_queue',
    //       // queueOptions: {
    //       //   durable: false,
    //       // },
    //     },
    //   },
    // ]),
  ],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
