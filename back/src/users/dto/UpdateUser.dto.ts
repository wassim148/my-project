import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  department: string;

  @IsString()
  projects: string;
}
