import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import config from '../config/env.config';
import { RabbitModule } from '../rabbit/rabbit.module';
import { LoggerModule } from '../logger/logger.module';
import { LastEventRepo } from '../lastEvent/lastEvent.repo';
import { LastEventModule } from '../lastEvent/lastEvent.module';
import { LastEvent, LastEventSchema } from '../lastEvent/lastEvent.schema';
import { ListenerRepo } from './listener.repo';
import { ListenerService } from './listener.service';
import { createListenerSchema } from './listener.schema';

@Module({
  imports: [
    LastEventModule,
    RabbitModule,
    LoggerModule,
    ...Object.keys(config.rabbit.queues.listenCollections).map((collectionName) => {
      return MongooseModule.forFeatureAsync([
        {
          name: collectionName,
          useFactory: () => createListenerSchema(collectionName),
        },
      ]);
    }),
    MongooseModule.forFeature([{ name: LastEvent.name, schema: LastEventSchema }]),
  ],
  providers: [ListenerService, ListenerRepo, LastEventRepo],
})
export class ListenerModule {}
