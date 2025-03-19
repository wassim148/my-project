import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CalendarEventService } from './event.service';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';

@UseGuards(JwtAuthGuard)
@Controller('events')
export class CalendarEventController {
  constructor(private readonly calendarEventService: CalendarEventService) {}

  @Post('/absence')
  async createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.calendarEventService.createEvent(createEventDto);
  }

  @Get('date/:date')
  async getEventsByDate(@Param('date') date: string): Promise<Event[]> {
    return this.calendarEventService.getEventsByDate(date);
  }

  @Get('month/:year/:month')
  async getEventsByMonth(
    @Param('year') year: number,
    @Param('month') month: number,
  ): Promise<Event[]> {
    return this.calendarEventService.getEventsByMonth(year, month);
  }

  @Get('week/:year/:week')
  async getEventsByWeek(
    @Param('year') year: number,
    @Param('week') week: number,
  ): Promise<Event[]> {
    return this.calendarEventService.getEventsByWeek(year, week);
  }

  @Put(':id/check-in')
  async addCheckIn(@Param('id') id: number): Promise<Event> {
    return this.calendarEventService.addCheckIn(id);
  }

  @Put(':id/check-out')
  async addCheckOut(@Param('id') id: number): Promise<Event> {
    return this.calendarEventService.addCheckOut(id);
  }
}
