import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notification.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async getNotifications(@Req() req) {
    const id = req.user.id;
    return this.notificationsService.getNotificationsForEmployee(id);
  }

  @Post()
  async createNotification(
    @Body() data: { employeId: number; message: string; type: string },
  ) {
    const notification = await this.notificationsService.createNotification(
      data.employeId,
      data.message,
    );
    this.notificationsService.emitNotification(notification);
    return notification;
  }
}
