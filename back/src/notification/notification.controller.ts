import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { NotificationsService } from './notification.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get(':employeId')
  async getNotifications(@Param('employeId') employeId: number) {
    return this.notificationsService.getNotificationsForEmployee(employeId);
  }

  @Post()
  async createNotification(
    @Body() data: { employeId: number; message: string },
  ) {
    return this.notificationsService.createNotification(
      data.employeId,
      data.message,
    );
  }
}
