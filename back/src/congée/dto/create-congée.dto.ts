import { IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateCongéeDto {
  @IsNotEmpty()
  @IsString()
  @Min(0)
  @Max(99999999)
  numcin: number;

  @IsNotEmpty()
  @IsString()
  dateDebut: string;

  @IsNotEmpty()
  @IsString()
  dateFin: string;

  @IsNotEmpty()
  @IsString()
  typeConge: string;

  @IsNotEmpty()
  @IsString()
  raison: string;
}
