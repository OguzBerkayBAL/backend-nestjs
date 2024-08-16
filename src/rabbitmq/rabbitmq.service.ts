import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, RpcException, Transport } from '@nestjs/microservices';
import { NotificationDto } from 'src/dto/notification.dto';

@Injectable()
export class RabbitMQService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'notification',
      },
    });
  }
  async sendNotification(notification: NotificationDto) {
    return await this.client
      .emit('notification', notification)
      .toPromise();
  }
}

