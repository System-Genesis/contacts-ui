import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { LastEvent, LastEventSchema } from './lastEvent.schema';
import { LastEventRepo } from './lastEvent.repo';

@Module({
  imports: [MongooseModule.forFeature([{ name: LastEvent.name, schema: LastEventSchema }])],
  providers: [LastEventRepo],
})
export class LastEventModule {}
