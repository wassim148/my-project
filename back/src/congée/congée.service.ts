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
import { HttpExceptionFilter } from 'src/exception-filter/http-exception.filter';
// import { Console } from 'console';

@Injectable()
export class CongesService {
  constructor(
    private readonly notificationsService: NotificationsService,
    @InjectRepository(Conge)
    private readonly congeRepository: Repository<Conge>,
    @Inject(forwardRef(() => WebsocketGateway))
    private readonly websocketGateway: WebsocketGateway,
  ) {}

  // async pointage(PointageDto: any): Promise<Conge> {
  //   const pointage = await this.congeRepository.preload({
  //     id: PointageDto.id,
  //     dateHeure: PointageDto.dateHeure,
  //     employeId: Number(PointageDto.employeId),
  //   });
  //   if (!pointage) {
  //     throw new Error('pointage non trouvé');
  //   }
  //   pointage.dateHeure = PointageDto.dateHeure;
  //   const savedPointage = await this.congeRepository.save(pointage);
  //   this.websocketGateway.server.emit('pointage', savedPointage);
  //   return savedPointage;
  // }

  async creerConge(
    createCongeDto: CreateCongéeDto,
    id: number,
  ): Promise<Conge> {
    console.log(createCongeDto);
    try {
      const conge = this.congeRepository.create({
        ...createCongeDto,
        employeId: id,
      });
      const savedConge = await this.congeRepository.save(conge);
      this.websocketGateway.server.emit('conge_created', savedConge);
      return savedConge;
    } catch (error) {
      console.log(error);
      throw HttpExceptionFilter;
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

  async validerConge(
    id: number,
    statut: 'waiting' | 'accepted' | 'refused',
  ): Promise<Conge> {
    const conge = await this.congeRepository.findOne({ where: { id } });
    if (!conge) {
      throw new Error('Congé non trouvé');
    }
    conge.status = statut;
    const savedConge = await this.congeRepository.save(conge);
    // Ajouter une notification
    const message = `Votre demande de congé du ${conge.dateDebut} au ${conge.dateFin} a été ${statut} par l'administration.`;
    await this.notificationsService.createNotification(
      conge.employeId,
      message,
    );
    this.websocketGateway.server.emit('conge_updated', savedConge);
    return savedConge;
  }

  async getTousLesConges(): Promise<Conge[]> {
    const conges = await this.congeRepository.find();
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
}
