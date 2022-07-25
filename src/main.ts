import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { defaultUser } from './data/default-user';
import { defaultTag } from './data/default-tag';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT).then(async () => {
    await defaultUser();
    await defaultTag();
  });
}
bootstrap();
