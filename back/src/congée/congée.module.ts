import { Module } from '@nestjs/common';
import { CongesService } from './congée.service';
import { CongesController } from './congée.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conge } from './entities/congée.entity';
import { UsersModule } from 'src/users/users.module';
import { WebsocketsModule } from 'src/webSockets/websockets.module';
import { NotificationModule } from 'src/notification/notification.module';
import { User } from 'src/users/entities/user.entities';
import { EventModule } from 'src/event/event.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conge, User]),
    UsersModule,
    WebsocketsModule,
    NotificationModule,
    EventModule,
  ],
  controllers: [CongesController],
  providers: [CongesService],
  exports: [CongesService],
})
export class CongéeModule {}
