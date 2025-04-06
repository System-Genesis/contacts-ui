import { Injectable } from '@nestjs/common';
import { Model, Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import envConfig from '../config/env.config';
import { Listener } from './listener.schema';

@Injectable()
export class ListenerRepo {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  public initiateChangeStream(collectionName: string, lastEventId?: string): ReturnType<Model<Listener>['watch']> {
    const collectionModel = this.connection.collection(collectionName);

    return collectionModel.watch([], {
      fullDocument: 'updateLookup',
      ...(lastEventId && envConfig.mongo.shouldHandleMissingEvents && { startAfter: { _data: lastEventId } }),
    });
  }
}
