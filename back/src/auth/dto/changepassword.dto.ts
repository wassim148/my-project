import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  readonly oldPassword: string;

  @IsNotEmpty()
  readonly newPassword: string;
}
