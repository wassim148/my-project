import { defineStore } from 'pinia';
import axios from 'axios';
import { env } from '../constants';

export const useRestrictionStore = defineStore('restriction', {
  state: () => ({
    restrictions: [] as { startDate: string; endDate: string; reason: string }[],
  }),
  actions: {
    async fetchRestrictions() {
      try {
        const response = await axios.get<{ startDate: string; endDate: string; reason: string }[]>(
          `${env.BACKEND_BASE_URL}/api/restrictions`
        );
        this.restrictions = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des périodes de restriction :', error);
      }
    },
  },
});