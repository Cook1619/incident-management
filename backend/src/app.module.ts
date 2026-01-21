import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { IncidentsModule } from './incidents/incidents.module';
import { DatabaseModule } from './database/database.module';
import { CacheModule } from './cache/cache.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    CacheModule,
    IncidentsModule,
    NotificationsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
