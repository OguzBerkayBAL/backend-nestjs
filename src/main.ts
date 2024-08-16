import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Dokümantasyonu')
    .setDescription('API açıklamalarını ve kullanımlarını içerir')
    .setVersion('1.0')
    .addTag('api')
    .build();
  
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api-docs', app, document);
    
  await app.listen(3002);

   // Create and start the microservice
   const microserviceApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    RabbitMQModule,
    {
      options: {
        urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
        queue: 'cats_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  await microserviceApp.listen();
  console.log('RabbitMQ Microservice is listening');
}
bootstrap();
