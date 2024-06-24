import { defineStore } from 'pinia'
import { parse, stringify } from 'zipson'
import type { Dashboard } from '@interfaces/dashboard'

export interface HistoryStore {
    history: Dashboard[]
}

const MAX_HISTORY_STORED = 3

export const useHistoryStore = defineStore('history', {
    state: (): HistoryStore => ({
        history: [],
    }),
    actions: {
        pushHistory(dashboard: Dashboard) {
            this.$patch((state) => {
                if (MAX_HISTORY_STORED == state.history.length) state.history.shift()
                state.history.push(dashboard)
            })
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
