import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { Logger } from '@nestjs/common';

async function main() {

  const logger = new Logger('Main-DataValidation');

  const app = await NestFactory.create(AppModule);
  await app.listen(envs.port);
  logger.log(`Data Validation Microservice running on port ${envs.port}`)
}
main();
