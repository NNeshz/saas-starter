import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // URL de tu frontend (Next.js corre en 3000 por defecto)
    credentials: true,
  });

  await app.listen(3001); // Cambiamos a puerto 3001 para el backend
}
bootstrap();
  