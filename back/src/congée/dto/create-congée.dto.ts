import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCongéeDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
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
  statut: string;

  @IsNotEmpty()
  @IsString()
  descreption: string;
}
