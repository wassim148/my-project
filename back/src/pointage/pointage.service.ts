import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pointage } from './entities/pointage.entity';
import { CongesService } from 'src/congée/congée.service';
import { Conge } from 'src/congée/entities/congée.entity';

@Injectable()
export class PointageService {
  constructor(
    @InjectRepository(Conge)
    private readonly congeRepository: Repository<Conge>,
    @InjectRepository(Pointage)
    private readonly pointageRepository: Repository<Pointage>,
    private readonly congesService: CongesService,
  ) {}

  async getPointagesByEmploye(employeId: number): Promise<Pointage[]> {
    return this.pointageRepository.find({
      where: { user: { id: employeId } },
      order: { date: 'ASC' },
    });
  }

  async enregistrerArrivee(
    employeId: number,
    date: string,
    heureArrivee: string,
  ): Promise<Pointage> {
    const pointage = this.pointageRepository.create({
      user: { id: employeId },
      date,
      heureArrivee,
    });
    return this.pointageRepository.save(pointage);
  }

  async enregistrerDepart(id: number, heureDepart: string): Promise<Pointage> {
    const pointage = await this.pointageRepository.findOneBy({ id });
    if (!pointage) throw new NotFoundException('Pointage non trouvé');

    pointage.heureDepart = heureDepart;
    return this.pointageRepository.save(pointage);
  }

  async generateLeaveReport(year: number, employeId: number): Promise<any> {
    const leaves = await this.congesService.getTousLesConges(employeId);
    return leaves.filter((leave) => {
      const date = new Date(leave.startDate);
      return date.getFullYear() === year;
    });
  }
  async getWorkingCalendar(id: number) {
    // Récupérer tous les congés approuvés de l'employé
    const conges = await this.congeRepository.find({
      where: { id, status: 'waiting' },
      order: { startDate: 'ASC' },
    });

    // Générer le calendrier avec les jours travaillés et les congés
    const calendar = [];
    const startDate = new Date(new Date().getFullYear(), 0, 1);
    const endDate = new Date(new Date().getFullYear(), 11, 31);

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      const isHoliday = conges.some(
        (c) => new Date(c.startDate) <= d && d <= new Date(c.endDate),
      );

      calendar.push({
        date: new Date(d),
        status: isHoliday ? 'congé' : 'travail',
      });
    }

    return calendar;
  }
}
