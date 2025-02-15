import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async getNotificationsForEmployee(
    employeId: number,
  ): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { user: { id: employeId } },
      order: { date: 'DESC' },
    });
  }

  async createNotification(
    employeId: number,
    message: string,
  ): Promise<Notification> {
    const notification = this.notificationRepository.create({
      user: { id: employeId },
      message,
    });
    return this.notificationRepository.save(notification);
  }
}
