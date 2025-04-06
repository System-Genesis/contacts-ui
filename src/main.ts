import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import envConfig from './config/env.config';

async function bootstrap() {
  console.log('Creating app with config:', envConfig);
  await NestFactory.createApplicationContext(AppModule);
}

bootstrap()
  .then(() => {
    console.log('service started');
  })
  .catch((err: unknown) => {
    console.log('process failed with error: ', err);
    process.exit(1);
  });

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
    process.exit(1);
  })
  .on('uncaughtException', (err) => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });
