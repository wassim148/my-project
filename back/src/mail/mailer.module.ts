import { Module } from '@nestjs/common';
import { MailService } from './mailer.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          transport: {
            host: configService.get('MAILER_HOST'),
            port: configService.get('MAILER_PORT'),
            secure: false,
            ignoreTLS: true,
            auth: {
              user: configService.get('MAILER_USERNAME'),
              pass: configService.get('MAILER_PASSWORD'),
            },
          },
          defaults: {
            from: configService.get('MAILER_FROM'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
