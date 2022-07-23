import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalConfigModule } from './config/config.module';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.md';
import { AuthModule } from './modules/auth/auth.md';
import { ProjectModule } from './modules/project/project.md';
import { CardModule } from './modules/card/card.md';

@Module({
  imports: [
    GlobalConfigModule,
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    UserModule,
    AuthModule,
    ProjectModule,
    CardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
