import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { defaultUser } from './data/default-user';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT).then(async () => {
    await defaultUser();
  });
}
bootstrap();
