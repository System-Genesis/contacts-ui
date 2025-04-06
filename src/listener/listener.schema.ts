import { Types } from 'mongoose';
import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  strict: false,
  timestamps: true,
})
export class Listener {
  _id: Types.ObjectId;
}

export const createListenerSchema = (collectionName: string) => {
  const schema = SchemaFactory.createForClass(Listener);
  schema.set('collection', collectionName);
  return schema;
};
