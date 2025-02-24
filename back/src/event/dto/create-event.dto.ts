import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreateEventDto {
  @IsString()
  description: string;

  @IsDate()
  date: Date;

  @IsNumber()
  userId: number; // The ID of the user creating the event
}
