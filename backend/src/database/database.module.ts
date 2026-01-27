import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigService } from '@nestjs/config';
import { Incident } from '../incidents/entities/incident.entity';
import { Notification } from '../notifications/entities/notification.entity';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        entities: [Incident, Notification],
        dbName: configService.get<string>('DB_NAME'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        user: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        type: 'postgresql',
        autoLoadEntities: true,
        debug: process.env.NODE_ENV !== 'production',
      }),
      inject: [ConfigService],
    }),
    MikroOrmModule.forFeature([Incident, Notification]),
  ],
  exports: [MikroOrmModule],
})
export class DatabaseModule {}
