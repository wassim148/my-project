import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CongesService } from './congée.service';
import { Conge } from './entities/congée.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('conges')
export class CongesController {
  constructor(private readonly congesService: CongesService) {}

  // @Post('pointage')
  // async pointageConge(@Body() PointageDto: any): Promise<Conge> {
  //   return this.congesService.pointage(PointageDto);
  // }

  @Post('creer')
  async creerConge(@Req() req, @Body() createCongeDto: any) {
    const id = req.user.id;
    return this.congesService.creerConge(createCongeDto, id);
  }

  @Get(':id')
  async getConge(@Param('id') id: number): Promise<Conge> {
    return this.congesService.getConge(id);
  }

  @Get('type/:typeConge')
  async getConges(@Param('typeConge') typeConge: string): Promise<Conge> {
    return this.congesService.getConges(typeConge);
  }

  @Put('/valider/:id')
  async validerConge(
    @Param('id') id: number,
    @Param('statut') statut: 'waiting' | 'accepted' | 'refused',
  ): Promise<Conge> {
    return this.congesService.validerConge(id, statut);
  }

  @Get()
  async getTousLesConges(): Promise<Conge[]> {
    return this.congesService.getTousLesConges();
  }

  @Delete(':id/supprimer')
  async supprimerConge(@Param('id') id: number): Promise<void> {
    return this.congesService.supprimerConge(id);
  }

  @Patch('/status/:id')
  async updateStatus(
    @Param('id') id: number,
    @Body() data: { status: 'waiting' | 'accepted' | 'refused' },
  ) {
    return this.congesService.updateStatus(id, data.status);
  }
}
