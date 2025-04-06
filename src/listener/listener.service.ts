import { Injectable, OnModuleInit } from '@nestjs/common';
import logger from 'logger-genesis';
import config from '../config/env.config';
import { RabbitService } from '../rabbit/rabbit.service';
import { LastEventRepo } from '../lastEvent/lastEvent.repo';
import { ListenerRepo } from './listener.repo';

@Injectable()
export class ListenerService implements OnModuleInit {
  constructor(
    private lastEventRepo: LastEventRepo,
    private listenerRepo: ListenerRepo,
    private rabbitService: RabbitService,
  ) {}

  public static changeStreamFatalError = 280;
  public static changeStreamHistoryLostError = 286;

  async onModuleInit() {
    const collectionNames = Object.keys(config.rabbit.queues.listenCollections);
    for (const collectionName of collectionNames) {
      const lastEvent = await this.lastEventRepo.findLastEvent(collectionName);
      logger.info(`Last event for ${collectionName}`, JSON.stringify(lastEvent));

      void this.startChangeStream(collectionName, lastEvent?.id);
    }
  }

  async startChangeStream(collectionName: string, lastEventId?: string, retryAttempt = 0) {
    try {
      const changeStream = this.listenerRepo.initiateChangeStream(collectionName, lastEventId);

      while (await changeStream.hasNext()) {
        const change = await changeStream.next();

        const id = (change._id as any)._data.toString() as string;
        const op = change.operationType;
        const eventTime = new Date((change.clusterTime?.getHighBits() ?? 0) * 1000);

        logger.info('Got New Event', 'Event id: ' + id + ' Operation: ' + op);

        this.rabbitService.publishMessageToQueue(collectionName, collectionName + '.' + op, change);

        await this.lastEventRepo.updateLastEvent(collectionName, id, eventTime);
      }
    } catch (error: any) {
      if (retryAttempt >= 3) {
        logger.error('Failed to start change stream after 3 attempts', error);
        throw new Error('Failed to start change stream after 3 attempts');
      }

      if (
        ![ListenerService.changeStreamFatalError, ListenerService.changeStreamHistoryLostError].includes(error.code)
      ) {
        logger.error('Failed to start change stream', error);
        throw error;
      } else {
        logger.info(
          'Resume token not found, starting from the latest change',
          'Resume token not found, starting from the latest change',
        );

        const lastEvent = await this.lastEventRepo.findLastEvent(collectionName);

        logger.info(`Last event for ${collectionName}`, JSON.stringify(lastEvent));

        await this.startChangeStream(collectionName, lastEvent?.id, retryAttempt + 1);
      }
    }
  }
}
