import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticationDto } from './dto/authentication.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Roles } from './roles/roles.decorator';
import { SignupDto } from './dto/signup.dto';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ResetPasswordDto } from './dto/resetpasswod.dto';
import { Tokens } from './types/token.types';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { v4 as uuidv4 } from 'uuid';
import { FileService } from 'src/file/file.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly fileService: FileService,
  ) {}

  @Post('signup')
  @UseInterceptors(FileInterceptor('file'))
  @ApiCreatedResponse({ description: 'Sign Up' })
  @ApiBadRequestResponse({ description: 'can not sign up, please try again' })
  async signUp(
    @Body() signupdata: SignupDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Tokens> {
    console.log(signupdata);
    if (file) {
      try {
        const fileName = `${uuidv4()}-${file.originalname}`;
        const fileUrl = await this.fileService.uploadFile(
          'photo',
          fileName,
          file.buffer,
        );

        signupdata.photo = fileUrl;
      } catch (error) {
        throw new Error('Failed to upload file to MinIO');
      }
    }

    return this.authService.signup(signupdata);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiCreatedResponse({ description: 'Login' })
  @ApiBadRequestResponse({ description: 'can not login, please try again' })
  async login(@Body() authenticate: AuthenticationDto) {
    return this.authService.authenticate(authenticate);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Get()
  profille(@Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(req.user);
  }

  @Get('verify')
  @ApiCreatedResponse({ description: 'Verify Email' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async verifyEmail(
    @Query('token') token: string,
    @Query('email') email: string,
  ) {
    return this.authService.verifyEmail(token, email);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ description: 'Refresh Token' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ description: 'Forgot Password' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
    @Query('token') token: string,
  ) {
    return this.authService.forgotPassword(forgotPasswordDto.email, token);
  }

  @Post('reset-password')
  @ApiCreatedResponse({ description: 'Reset Password' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.password,
    );
  }

  @Post('sign-out')
  @ApiCreatedResponse({ description: 'Sign Out' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async signOut(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.signOut(refreshTokenDto.refreshToken);
  }
}
