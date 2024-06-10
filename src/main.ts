import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //O whitelist ignora todos os dados passados que não estejam declarados no DTO
      forbidNonWhitelisted: true, //O forbidNonWhitelisted impede que dados não declarados no DTO sejam passados
      transform: true, //O transform converte os dados (payload) para o tipo declarado no DTO
    }),
  );
  await app.listen(3000);
}
bootstrap();
