import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ClientRMQ } from '@nestjs/microservices';
import config from '../config/env.config';

@Injectable()
export class RabbitService {
  private readonly queueMap: Record<string, ClientRMQ> = {};

  constructor(private readonly moduleRef: ModuleRef) {
    this.queueMap = Object.fromEntries(
      Object.entries(config.rabbit.queues.listenCollections).map(([collectionName, queueName]) => [
        collectionName,
        this.moduleRef.get(queueName, { strict: false }),
      ]),
    );
  }

  onApplicationBootstrap() {
    Object.values(this.queueMap).forEach((queue) => {
      queue.handleDisconnectError = (client) => {
        client.addListener('disconnect', (err) => {
          console.log('RabbitMQ disconnected', err);
          process.exit(1);
        });
      };
      void queue.connect();
    });
  }

  publishMessageToQueue(collectionName: string, eventName: string, payload: any, option?: any) {
    this.queueMap[collectionName].emit(eventName, { eventName, payload, option }).subscribe();
  }
}
