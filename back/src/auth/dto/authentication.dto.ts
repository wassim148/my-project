import { IsNotEmpty, IsString } from 'class-validator';
export class AuthenticationDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}
