import { ConsoleLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  const logger = new ConsoleLogger('OrderProcessor');
  await app.listen(port);
  logger.log(`Server running on http://localhost:${port}`);
}
bootstrap();
