import { IsString, IsDate, IsNumber, IsOptional } from 'class-validator';

export class CreateEventDto {
  @IsString()
  description: string;

  @IsNumber()
  date: number;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsNumber()
  userId: number;

  @IsOptional()
  @IsString()
  status: string;
}
