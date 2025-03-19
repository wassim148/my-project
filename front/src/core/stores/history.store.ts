import { defineStore } from 'pinia'
import { parse, stringify } from 'zipson'
import type { Dashboard } from '@interfaces/dashboard'
import { env } from '../constants'

export interface HistoryStore {
    leaves: Dashboard[]
    statistics: any
}

const MAX_HISTORY_STORED = 3

export const useHistoryStore = defineStore('history', {
    state: (): HistoryStore => ({
        leaves: [],
        statistics: []
    }),
    actions: {
        pushHistory(dashboard: Dashboard) {
            this.$patch((state) => {
                if (MAX_HISTORY_STORED == state.leaves.length) state.leaves.shift()
                state.leaves.push(dashboard)
            })
        },
        async fetchLeaves() {
            const response = await window.$axios.get(`${env.BACKEND_BASE_URL}/api/history/leaves`);
            this.$patch({leaves : response});
        },
          async exportToExcel() {
            window.open(`${env.BACKEND_BASE_URL}/api/history/leaves/export`, '_blank');
          },
          async fetchStatistics() {
            try {
              const response = await window.$axios.get(`${env.BACKEND_BASE_URL}/api/history/statistics`);
              this.$patch({statistics : response});
            } catch (error) {
              console.error('Erreur lors de la récupération des statistiques', error);
            }
          },
    },
    persist: {
        paths: ['history'],
        serializer: {
            deserialize: parse,
            serialize: stringify,
        },
    },
})
