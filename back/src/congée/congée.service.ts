import {
  forwardRef,
  HttpException,
  HttpStatus,
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
    return Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1; // Inclusif
  }

  async creerConge(
    createCongeDto: CreateCongéeDto,
    id: number,
    user: string,
  ): Promise<Conge> {
    try {
      const conge = this.congeRepository.create({
        ...createCongeDto,
        employeId: id,
        username: user,
        nombreJours: this.calculateDaysBetweenDates(
          createCongeDto.startDate,
          createCongeDto.endDate,
        ),
      });
      if (!conge) {
        throw new NotFoundException(`Leave with id ${id} not found`);
      }
      if (conge.typeConge === 'annual' || conge.typeConge === 'Sans solde') {
        if (status === 'accepted') {
          if (conge.nombreJours > conge.employe.leaveBalance) {
            throw new Error('Insufficient leave balance for this request');
          }
          conge.employe.leaveBalance -= conge.nombreJours;
          await this.userRepository.save(conge.employe);
        }
      }
      const event = await this.calendarEventService.createEvent({
        description: `Congé ${conge.typeConge} du ${conge.startDate.toLocaleDateString()} au ${conge.endDate.toLocaleDateString()}`,
        startDate: conge.startDate,
        endDate: conge.endDate,
        userId: conge.employeId,
        date: conge.nombreJours,
      });
      const savedConge = await this.congeRepository.save(conge);
      this.websocketGateway.server.emit('conge_created', savedConge);
      return savedConge;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getConge(id: number): Promise<Conge> {
    this.websocketGateway.server.emit('conge_updated', id);
    return this.congeRepository.findOne({ where: { id } });
  }

  async getConges(typeConge: string): Promise<Conge> {
    this.websocketGateway.server.emit('conge_updated', typeConge);
    return this.congeRepository.findOne({
      where: { typeConge },
    });
  }

  async validerConge(id: number, status: string): Promise<Conge> {
    const conge = await this.congeRepository.findOne({
      where: { id },
      relations: ['employe'],
    });
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
    this.websocketGateway.server.emit('conges_updated', conges);
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
}
