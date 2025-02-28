import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class CalendarEventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const { description, date, userId } = createEventDto;

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date format');
    }

    const event = this.eventRepository.create({
      description,
      date: parsedDate,
      user: { id: userId },
    });

    return this.eventRepository.save(event);
  }

  async getEventsByDate(date: string): Promise<Event[]> {
    const parsedDate = new Date(date);
    return this.eventRepository.find({
      where: {
        date: Between(
          new Date(parsedDate.setHours(0, 0, 0, 0)),
          new Date(parsedDate.setHours(23, 59, 59, 999)),
        ),
      },
      relations: ['user'],
    });
  }

  async getEventsByMonth(year: number, month: number): Promise<Event[]> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    return this.eventRepository.find({
      where: { date: Between(startDate, endDate) },
      relations: ['user'],
    });
  }

  async getEventsByWeek(year: number, week: number): Promise<Event[]> {
    const startDate = this.getWeekStartDate(year, week);
    const endDate = this.getWeekEndDate(year, week);
    return this.eventRepository.find({
      where: { date: Between(startDate, endDate) },
      relations: ['user'],
    });
  }

  async addCheckIn(eventId: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
    });
    if (!event) throw new Error('Événement introuvable.');
    event.starDate = new Date();
    return this.eventRepository.save(event);
  }

  async addCheckOut(eventId: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
    });
    if (!event) throw new Error('Événement introuvable.');
    if (!event.starDate)
      throw new Error("Veuillez effectuer un check-in d'abord.");
    event.endDate = new Date();
    return this.eventRepository.save(event);
  }

  private getWeekStartDate(year: number, week: number): Date {
    const simple = new Date(year, 0, 1 + (week - 1) * 7);
    const dayOfWeek = simple.getDay();
    const diff = simple.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    return new Date(simple.setDate(diff));
  }

  private getWeekEndDate(year: number, week: number): Date {
    const startDate = this.getWeekStartDate(year, week);
    return new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000);
  }
}
