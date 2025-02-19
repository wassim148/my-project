import { Controller, Get, Param, Put } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('/events')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get('date/:date')
  async getEventsByDate(@Param('date') date: string) {
    return this.eventService.getEventsByDate(date);
  }

  @Put(':id/check-in')
  async addCheckIn(@Param('id') id: string) {
    return this.eventService.addCheckIn(+id);
  }

  @Put(':id/check-out')
  async addCheckOut(@Param('id') id: string) {
    return this.eventService.addCheckOut(+id);
  }
}
