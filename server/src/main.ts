import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // Middleware para loggear las peticiones HTTP
  app.use((req, res, next) => {
    const logger = new Logger('HTTP');
    const startTime = Date.now();

    // Cuando la respuesta termine
    res.on('finish', () => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      logger.log(
        `${req.method} ${req.originalUrl} ${res.statusCode} ${responseTime}ms`
      );
    });

    next();
  });

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  const logger = new Logger('Bootstrap');
  logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
  