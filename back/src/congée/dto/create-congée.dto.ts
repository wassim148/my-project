import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCongéeDto {
  @IsNotEmpty()
  @IsNumber()
  numcin: number;

  @IsNotEmpty()
  // @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsString()
  endDate: Date;

  @IsNotEmpty()
  @IsString()
  typeConge: string;

  @IsNotEmpty()
  @IsString()
  raison: string;

  @Optional()
  piècesjustificatives: string;
}
