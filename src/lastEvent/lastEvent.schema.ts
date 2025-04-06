import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import envConfig from '../config/env.config';

@Schema({
  collection: envConfig.mongo.lastEventCollectionName,
  strict: false,
  timestamps: true,
  versionKey: false,
  autoIndex: true,
})
export class LastEvent {
  @Prop({ type: String, require: true, sparse: true, unique: true })
  id: string;

  @Prop({ type: String, require: true })
  collectionName: string;

  @Prop({ type: Date, require: true })
  eventTime: Date;
}

export const LastEventSchema = SchemaFactory.createForClass(LastEvent);
