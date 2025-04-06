import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import config from '../config/env.config';
import { RabbitService } from './rabbit.service';

@Module({
  imports: [
    ...Object.values(config.rabbit.queues.listenCollections).map((queueName) => {
      return ClientsModule.register([
        {
          name: queueName,
          transport: Transport.RMQ,
          options: {
            urls: [config.rabbit.url],
            queue: queueName,
            queueOptions: {
              durable: true,
            },
          },
        },
      ]);
    }),
  ],
  providers: [RabbitService],
  exports: [RabbitService],
})
export class RabbitModule {}
