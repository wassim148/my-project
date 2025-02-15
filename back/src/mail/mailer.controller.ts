import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mailer.service';
import { ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly mailService: MailService) {}
  @Post('send-verification-email')
  @ApiCreatedResponse({ description: 'Send verification email' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async sendVerificationEmail(@Body('email') email: string) {
    const token = 'random-token'; // Generate a verification token
    await this.mailService.sendVerificationEmail(email, token);
    return { message: 'Verification email sent' };
  }
}
