import { Module } from '@nestjs/common';
import logger from 'logger-genesis';
import envConfig from '../config/env.config';

@Module({
  providers: [],
  exports: [],
})
export class LoggerModule {
  async onModuleInit() {
    await logger.initialize(envConfig.metaData.systemName, envConfig.metaData.serviceName, true, {
      uri: envConfig.rabbit.url,
      createMenashRabbitMQConnection: true,
      logQueueName: envConfig.rabbit.logQueue,
      retryOptions: envConfig.rabbit.retryOptions,
    });
  }
}
