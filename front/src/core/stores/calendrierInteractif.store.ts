import { defineStore } from 'pinia';
import axios from 'axios';
import { env } from '../constants';

export const useCalendarEventStore = defineStore('calendarEvent', {
  state: () => ({
    selectedDate: new Date(),
    events: [] as any[],
  }),
  getters: {
    formattedSelectedDate(): string {
      return this.selectedDate.toISOString().split('T')[0];
    },
  },
  actions: {
    async loadEvents(date: Date) {
      try {
        this.selectedDate = date;
        const response = await window.$axios.get<any[]>(`${env.BACKEND_BASE_URL}/api/events/date/${this.formattedSelectedDate}`);
        this.events = response.data.map((event) => ({
          ...event,
          checkInTime: event.checkInTime ? new Date(event.checkInTime) : null,
          checkOutTime: event.checkOutTime ? new Date(event.checkOutTime) : null,
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des événements :', error);
        throw error;
      }
    },
    async addCheckIn(eventId: number) {
      try {
        await window.$axios.put(`${env.BACKEND_BASE_URL}/api/events/${eventId}/check-in`);
      } catch (error) {
        console.error('Erreur lors du check-in :', error);
        throw error;
      }
    },
    async addCheckOut(eventId: number) {
      try {
        await window.$axios.put(`${env.BACKEND_BASE_URL}/api/events/${eventId}/check-out`);
      } catch (error) {
        console.error('Erreur lors du check-out :', error);
        throw error;
      }
    },
    async createAbsence(date: Date, description: string) {
      try {
        const formattedDate = date.toISOString().split('T')[0];
        const response = await window.$axios.post(`${env.BACKEND_BASE_URL}/api/events/absence`, {
          dateDebut: formattedDate,
          dateFin: formattedDate,
          description,
          status: 'pending',
        });
        this.events.push({
          id: response.data.id,
          description: response.data.description,
          dateDebut: new Date(response.data.dateDebut),
          dateFin: new Date(response.data.dateFin),
          status: response.data.status,
          checkInTime: null,
          checkOutTime: null,
        });
      } catch (error) {
        console.error('Erreur lors de la création de l\'absence :', error);
        throw error;
      }
    },
  },
});
