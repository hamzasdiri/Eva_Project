import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // Enable CORS
  app.enableCors();

  // Use PORT environment variable or fallback to 3000
  const port = process.env.PORT || 4000;
  console.log('Listening on port', port);
  await app.listen(port);
}

bootstrap();
