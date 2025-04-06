import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LastEvent } from './lastEvent.schema';

@Injectable()
export class LastEventRepo {
  constructor(@InjectModel(LastEvent.name) private lastEvent: Model<LastEvent>) {}

  findLastEvent(collectionName: string) {
    return this.lastEvent.findOne({ collectionName }).sort({ updatedAt: -1 }).lean().exec();
  }

  updateLastEvent(collectionName: string, newEventId: string, eventTime: Date) {
    return this.lastEvent
      .updateOne({ collectionName }, { $set: { id: newEventId, eventTime } }, { upsert: true })
      .exec();
  }
}
