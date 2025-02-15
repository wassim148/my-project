import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entities';
import { Roles } from 'src/auth/decorator/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { ChangePasswordDto } from 'src/auth/dto/changepassword.dto';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/auth/enums/role.enum';

@Roles([Role.User])
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/me/:id')
  async findOne(@Req() req): Promise<User> {
    const id = req.user.id;
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
    return res.status(HttpStatus.OK).jons(req.user);
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
}
