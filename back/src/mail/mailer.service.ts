import { Injectable } from '@nestjs/common';
import { MailerService, ISendMailOptions } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(mailOptions: ISendMailOptions) {
    try {
      await this.mailerService.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async sendVerificationEmail(to: string, token: string) {
    try {
      const url = `http://localhost:3000/auth/verify?token=${token}`;
      const mailOptions: ISendMailOptions = {
        from: `"Your App Name" <${process.env.MAILER_FROM}>`,
        to,
        subject: 'Verify your email',
        text: `Please verify your email by clicking on the following link: ${url}`,
        html: `<p>Please verify your email by clicking on the following link: <a href="${url}">Verify Email</a></p>`,
      };
      await this.sendMail(mailOptions);
      console.log('MAILER_HOST:', process.env.MAILER_HOST);
      console.log('MAILER_PORT:', process.env.MAILER_PORT);
    } catch (error) {
      throw error;
    }
  }

  async sendPasswordResetEmail(to: string, token: string) {
    try {
      const url = `http://localhost:3001/auth/reset-password?token=${token}`;
      const mailOptions: ISendMailOptions = {
        from: `"Your App Name" <${process.env.MAILER_FROM}>`,
        to,
        subject: 'Reset your password',
        text: `Please reset your password by clicking on the following link: ${url}`,
        html: `<p>Please reset your password by clicking on the following link: <a href="${url}">Reset Password</a></p>`,
      };
      await this.sendMail(mailOptions);
    } catch (error) {
      throw error;
    }
  }
}
