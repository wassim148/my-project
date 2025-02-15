import { IsNotEmpty, IsString } from 'class-validator';

export class PointageDto {
  @IsNotEmpty()
  @IsString()
  readonly idEmploye: string;

  @IsNotEmpty()
  @IsString()
  readonly dateHeure: string;
}
