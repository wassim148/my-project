import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conge } from './entities/congée.entity';
import { WebsocketGateway } from 'src/webSockets/websockets-gateway';
import { CreateCongéeDto } from './dto/create-congée.dto';
import { NotificationsService } from 'src/notification/notification.service';
import { User } from 'src/users/entities/user.entities';
import { CalendarEventService } from 'src/event/event.service';

@Injectable()
export class CongesService {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly calendarEventService: CalendarEventService,
    @InjectRepository(Conge)
    private readonly congeRepository: Repository<Conge>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => WebsocketGateway))
    private readonly websocketGateway: WebsocketGateway,
  ) {}

  calculateDaysBetweenDates(startDate: Date, endDate: Date): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    return Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;
  }
  async creerConge(
    createCongeDto: CreateCongéeDto,
    id: number,
    user: string,
  ): Promise<Conge> {
    const employe = await this.userRepository.findOne({ where: { id } });
    if (!employe) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const conge = this.congeRepository.create({
      ...createCongeDto,
      employeId: id,
      username: user,
      nombreJours: this.calculateDaysBetweenDates(
        createCongeDto.startDate,
        createCongeDto.endDate,
      ),
    });
    if (conge.typeConge === 'annual' || conge.typeConge === 'maladie') {
      if (conge.nombreJours > employe.leaveBalance) {
        throw new Error('Insufficient leave balance for this request');
      }
      employe.leaveBalance -= conge.nombreJours;
      console.log(employe);
      await this.userRepository.save(employe);
    }
    const event = await this.calendarEventService.createEvent({
      description: `Congé ${createCongeDto.typeConge} du ${createCongeDto.startDate} au ${createCongeDto.endDate}`,
      startDate: createCongeDto.startDate,
      endDate: createCongeDto.endDate,
      userId: id,
      date: conge.nombreJours,
      status: 'pending',
    });
    if (event) {
      this.websocketGateway.server.emit('event_created', event);
    }
    const savedConge = await this.congeRepository.save(conge);
    if (savedConge.status === 'accepted') {
      const message = `Votre congé du ${savedConge.startDate} au ${savedConge.endDate} a été accepté.`;
      await this.notificationsService.createNotification(
        savedConge.employeId,
        message,
      );
    }
    return savedConge;
  }

  async getConge(id: number): Promise<Conge> {
    return this.congeRepository.findOne({ where: { id } });
  }

  async getConges(typeConge: string): Promise<Conge> {
    return this.congeRepository.findOne({
      where: { typeConge },
    });
  }

  async validerConge(id: number, status: string): Promise<Conge> {
    const conge = await this.congeRepository.findOne({
      where: { id },
      relations: ['employe'],
    });

    if (status === 'refused') {
      conge.employe.leaveBalance += conge.nombreJours;
      await this.userRepository.save(conge.employe);
    }

    conge.status = status;
    const savedConge = await this.congeRepository.save(conge);

    const message = `Votre demande de congé du ${conge.startDate} au ${conge.endDate} a été ${status} par l'administration.`;
    await this.notificationsService.createNotification(
      conge.employeId,
      message,
    );

    this.websocketGateway.server.emit('conge_updated', savedConge);
    return savedConge;
  }

  async getTousLesConges(id: number): Promise<Conge[]> {
    const conges = await this.congeRepository.findBy({ employeId: id });
    return conges;
  }

  async supprimerConge(id: number): Promise<void> {
    await this.congeRepository.delete(id);
    this.websocketGateway.server.emit('conge_deleted', id);
  }

  async updateStatus(
    id: number,
    status: 'waiting' | 'accepted' | 'refused',
  ): Promise<Conge> {
    const conge = await this.congeRepository.findOneBy({ id });
    if (!conge) throw new NotFoundException('Leave request not found');

    conge.status = status;
    return this.congeRepository.save(conge);
  }

  async getHistoriqueConges(employeId: number): Promise<Conge[]> {
    return this.congeRepository.find({
      where: { employeId },
      order: { startDate: 'DESC' },
    });
  }

  async getAllConges(): Promise<Conge[]> {
    return this.congeRepository.find({
      order: { startDate: 'DESC' },
    });
  }

  async updateLeave(
    id: number,
    body: { startDate: Date; endDate: Date },
  ): Promise<Conge> {
    const conge = await this.congeRepository.findOneBy({ id });

    if (!conge) {
      throw new NotFoundException('Congé non trouvé');
    }

    conge.startDate = body.startDate;
    conge.endDate = body.endDate;
    await this.congeRepository.save(conge);
    if (conge.status === 'accepted' || conge.status === 'refused') {
      this.updateStatus(id, 'waiting');
    }
    return conge;
  }

  async annulé(id: number) {
    const conge = await this.congeRepository.findOneBy({ id });
    if (!conge) throw new NotFoundException('Congé non trouvé');

    conge.employe.leaveBalance += conge.nombreJours;
    await this.userRepository.save(conge.employe);

    await this.congeRepository.delete(id);
    this.websocketGateway.server.emit('conge_deleted', id);
  }
}
