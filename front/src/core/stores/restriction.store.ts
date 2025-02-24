import { defineStore } from 'pinia';
import axios from 'axios';
import { env } from '../constants';

export const useRestrictionStore = defineStore('restriction', {
  state: () => ({
    restrictions: [] as any[],
  }),
  actions: {
    async fetchRestrictions() {
      try {
        const response = await axios.get<any[]>(`${env.BACKEND_BASE_URL}/api/restrictions`);
        this.restrictions = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des restrictions :', error);
        throw error;
      }
    },
  },
});