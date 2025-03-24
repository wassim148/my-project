import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Delete,
  Param,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UsersService } from './users.service';
import { User } from './entities/user.entities';
import { Roles } from 'src/auth/decorator/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { ChangePasswordDto } from 'src/auth/dto/changepassword.dto';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/auth/enums/role.enum';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { FileService } from 'src/file/file.service';
import { v4 as uuidv4 } from 'uuid';

@UseGuards(JwtAuthGuard)
@Roles([Role.User])
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly fileService: FileService,
  ) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('profile/:id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() User: User): Promise<User> {
    return this.usersService.create(User);
  }

  @Roles([Role.Admin])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  profile(@Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(req.user);
  }

  @Put('change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req,
  ) {
    return this.usersService.changePassword(
      req.user.username,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword,
    );
  }

  @Roles([Role.Admin])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateuser(id, updateUserDto);
  }

  @Put('change-drpt-prjt/:id')
  updateLeave(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateuser(id, updateUserDto);
  }

  @Post('upload-avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (req, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const fileExt = extname(file.originalname);
          callback(null, `avatar-${uniqueSuffix}${fileExt}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.startsWith('image/')) {
          return callback(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        callback(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async uploadAvatar(@UploadedFile() file: Express.Multer.File, @Req() req) {
    if (!req.user) throw new UnauthorizedException('User not authenticated');
    if (!file) throw new BadRequestException('File is required');

    try {
      const fileName = `${uuidv4()}-${file.originalname}`;
      const avatarUrl = await this.fileService.uploadFile(
        'conges',
        fileName,
        file.buffer,
      );
      await this.usersService.updateUserAvatar(req.user.id, avatarUrl);
      console.log(`User ${req.user.id} uploaded avatar: ${avatarUrl}`);

      return { avatarUrl };
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw new InternalServerErrorException('Failed to upload avatar');
    }
  }

  // Update Username
  @Put('update-username')
  async updateUsername(@Body() body: { username: string }, @Req() req) {
    if (!body.username) throw new BadRequestException('Username is required');

    await this.usersService.updateUserName(req.user.id, body.username);

    return { message: 'Username updated successfully' };
  }
}
