import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import envConfig from './config/env.config';
import { ListenerModule } from './listener/listener.module';

@Module({
  imports: [MongooseModule.forRoot(envConfig.mongo.uri), ListenerModule],
})
export class AppModule {}
