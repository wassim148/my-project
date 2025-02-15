import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../enums/role.enum';

export class ProfilleDto {
  @IsNotEmpty()
  @IsInt()
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  readonly numcin: string;

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly role: Role;
}
