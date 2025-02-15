import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendMail(mailOptions: ISendMailOptions) {
    try {
      await this.mailerService.sendMail(mailOptions);
    } catch (error) {
      throw error;
    }
  }

  async sendVerificationEmail(to: string, token: string) {
    try {
      const url = `http://localhost:3001/auth/verify?token=${token}`;

      const mailOptions = {
        from: '"Your App Name" <your-email@example.com>',
        to,
        subject: 'Verify your email',
        text: `Please verify your email by clicking on the following link: ${url}`,
        html: `<p>Please verify your email by clicking on the following link: <a href="${url}">Verify Email</a></p>`,
      };
      await this.mailerService.sendMail(mailOptions);
    } catch (error) {
      throw error;
    }
  }

  async sendPasswordResetEmail(to: string, token: string) {
    try {
      const url = `http://localhost:3001/auth/reset-password?token=${token}`;

      const mailOptions = {
        from: '"Your App Name" <your-email@example.com>',
        to,
        subject: 'Reset your password',
        text: `Please reset your password by clicking on the following link: ${url}`,
        html: `<p>Please reset your password by clicking on the following link: <a href="${url}">Reset Password</a></p>`,
      };

      await this.mailerService.sendMail(mailOptions);
    } catch (error) {
      throw error;
    }
  }
}
