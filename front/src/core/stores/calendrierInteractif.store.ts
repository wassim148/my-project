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
        const response = await window.$axios.get<any[]>(
          `${env.BACKEND_BASE_URL}/api/events/date/${this.formattedSelectedDate}`
        );
    
        // Validate response data
        if (!response || !Array.isArray(response.data)) {
          console.error('Réponse invalide de l\'API :', response);
          this.events = []; // Reset events to avoid further errors
          return;
        }
    
        // Map the events if the response is valid
        this.events = response.data.map((event) => ({
          ...event,
          startDate: event.startDate ? new Date(event.startDate) : null,
          evdDate: event.evdDate ? new Date(event.evdDate) : null,
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des événements :', error);
        this.events = []; // Reset events in case of error
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
        const formattedDate = date.toISOString(); // Use ISO format for dates
        const userId = 1; // Replace with actual user ID (e.g., from authentication)
    
        const response = await window.$axios.post(`${env.BACKEND_BASE_URL}/api/events/absence`, {
          description,
          startDate: formattedDate, // Use ISO format for startDate
          endDate: formattedDate,   // Use ISO format for endDate
          userId,                   // Include the user ID
          status: 'pending',        // Status remains pending
        });
    
        this.events.push({
          id: response.data.id,
          description: response.data.description,
          dateDebut: new Date(response.data.startDate),
          dateFin: new Date(response.data.endDate),
          status: response.data.status,
          startDate: null,
          evdDate: null,
        });
      } catch (error) {
        console.error('Erreur lors de la création de l\'absence :', error);
        throw error;
      }
    },
  },
});
