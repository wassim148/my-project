import { PartialType } from '@nestjs/mapped-types';
import { CreateCongéeDto } from './create-congée.dto';

export class UpdateCongéeDto extends PartialType(CreateCongéeDto) {
  id: number;
}
