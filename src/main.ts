import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { defaultUser } from './data/default-user';
import { defaultTag } from './data/default-tag';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app));
  app.enableCors();
  await app.listen(process.env.PORT).then(async () => {
    await defaultUser();
    await defaultTag();
  });
}
bootstrap();
