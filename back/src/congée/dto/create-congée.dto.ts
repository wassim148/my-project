// import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateCongéeDto {
  @IsNotEmpty()
  @IsString()
  @Min(10000000)
  @Max(99999999)
  numcin: number;

  @IsNotEmpty()
  @IsString()
  dateDebut: Date;

  @IsNotEmpty()
  @IsString()
  dateFin: Date;

  @IsNotEmpty()
  @IsString()
  typeConge: string;

  @IsNotEmpty()
  @IsString()
  raison: string;

  // @IsNotEmpty()
  // @IsString()
  // @Optional()
  // piècesjustificatives: string;
}
