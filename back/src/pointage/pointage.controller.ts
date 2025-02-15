import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { PointageService } from './pointage.service';

@Controller('pointage')
export class PointageController {
  constructor(private readonly pointageService: PointageService) {}

  @Get(':employeId')
  async getPointages(@Param('employeId') employeId: number) {
    return this.pointageService.getPointagesByEmploye(employeId);
  }

  @Post('/arrivee')
  async enregistrerArrivee(
    @Body() data: { employeId: number; date: string; heureArrivee: string },
  ) {
    return this.pointageService.enregistrerArrivee(
      data.employeId,
      data.date,
      data.heureArrivee,
    );
  }

  @Patch('/depart/:id')
  async enregistrerDepart(
    @Param('id') id: number,
    @Body() data: { heureDepart: string },
  ) {
    return this.pointageService.enregistrerDepart(id, data.heureDepart);
  }

  @Get('calendar/:employeId')
  async getWorkingCalendar(@Param('employeId') employeId: number) {
    return this.pointageService.getWorkingCalendar(employeId);
  }
}
