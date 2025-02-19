import { IsNotEmpty, IsString } from 'class-validator';
export class AuthenticationDto {
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
