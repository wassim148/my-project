import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async getEventsByDate(date: string): Promise<any[]> {
    return this.eventRepository.find({ where: { date: new Date(date) } });
  }

  async addCheckIn(eventId: number): Promise<void> {
    await this.eventRepository.update(eventId, { checkInTime: new Date() });
  }

  async addCheckOut(eventId: number): Promise<void> {
    await this.eventRepository.update(eventId, { checkOutTime: new Date() });
  }
}
