import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class createUserdto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsString({ each: true })
  readonly Projects: string[];
}
