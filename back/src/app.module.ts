import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from './mail/mailer.module';
import { WebsocketsModule } from './webSockets/websockets.module';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { CongéeModule } from './congée/congée.module';
import { NotificationModule } from './notification/notification.module';
import { EventModule } from './event/event.module';
import { LeaveRequestModule } from './leave-request/leave-request.module';
import { FileModule } from './file/file.module';
import { HistoryModule } from './history/history.module';
// import { AlertsService } from './alerts/alerts.service';
// import { AlertsScheduler } from './alerts/alerts.scheduler';
// import { ScheduleModule } from '@nestjs/schedule';
// import { APP_SCHEDULER } from '@nestjs/schedule';
import { DepartementModule } from './departement/departement.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'DDRVIKING147',
      database: 'conge',
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    MailModule,
    WebsocketsModule,
    CongéeModule,
    NotificationModule,
    EventModule,
    LeaveRequestModule,
    FileModule,
    HistoryModule,
    DepartementModule,
    ProjectModule,
    // ScheduleModule.forRoot('standal'),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    WebsocketsModule,
    // AlertsService,
    // {
    //   provide: APP_SCHEDULER,
    //   useClass: AlertsScheduler,
    // },
  ],
})
export class AppModule {}
