import { defineStore } from 'pinia';
import axios from 'axios';
import { env } from '../constants';

export const useHolidayStore = defineStore('holiday', {
  state: () => ({
    holidays: [] as { date: string; name: string }[],
  }),
  actions: {
    async fetchHolidays() {
      try {
        const response = await axios.get<{ date: string; name: string }[]>(
          `${env.BACKEND_BASE_URL}/api/holidays`
        );
        this.holidays = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des jours fériés :', error);
      }
    },
  },
});