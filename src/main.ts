import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/App/app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform:true,
    whitelist:true, //elimina las propiedades que no tienen decoradores de validación.
    forbidNonWhitelisted:true //en lugar de eliminarlas silenciosamente, devuelve un error si el cliente envía propiedades no permitidas.
  }));
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
