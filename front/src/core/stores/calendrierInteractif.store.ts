// stores/calendarEventStore.ts
import { defineStore } from 'pinia';
import axios from 'axios';

export const useCalendarEventStore = defineStore('calendarEvent', {
  state: () => ({
    selectedDate: new Date(), 
    events: [] as string[], 
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
        const response = await axios.get<string[]>(`/api/events?date=${this.formattedSelectedDate}`);
        this.events = response.data; 
      } catch (error) {
        console.error('Erreur lors de la récupération des événements :', error);
        throw error;
      }
    },
  },
});