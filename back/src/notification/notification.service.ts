import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { WebsocketGateway } from 'src/webSockets/websockets-gateway';
import { Server } from 'socket.io';

@Injectable()
export class NotificationsService {
  private io: Server;

  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @Inject(forwardRef(() => WebsocketGateway))
    private readonly websocketGateway: WebsocketGateway,
  ) {}

  setSocketServer(io: Server) {
    this.io = io;
  }

  async getNotificationsForEmployee(id: number): Promise<Notification[]> {
    this.websocketGateway.server.emit('notification', id);
    return this.notificationRepository.findBy({ employeId: id });
  }

  async createNotification(
    employeId: number,
    message: string,
  ): Promise<Notification> {
    const notification = this.notificationRepository.create({
      employe: { id: employeId },
      message,
    });

    const savedNotification =
      await this.notificationRepository.save(notification);

    this.emitNotification(savedNotification);

    return savedNotification;
  }

  emitNotification(notification: Notification) {
    if (this.websocketGateway.server) {
      this.websocketGateway.server.emit('newNotification', notification);
    }
  }
}
