import { defineStore } from 'pinia'
import { parse, stringify } from 'zipson'
import type { Dashboard } from '@interfaces/dashboard'

export interface DashboardStore {
    isLeftSidebarCollapsed: boolean
    isRightSidebarCollapsed: boolean
}

const MAX_HISTORY_STORED = 3

export const useDashboardStore = defineStore('dashboard', {
    state: (): DashboardStore => ({
        isLeftSidebarCollapsed: false,
        isRightSidebarCollapsed: false,
    }),
    actions: {
        isAnySidebarCollapsed() {
            return this.isLeftSidebarCollapsed || this.isRightSidebarCollapsed
        },
        isAllSidebarCollapsed() {
            return this.isLeftSidebarCollapsed && this.isRightSidebarCollapsed
        },
    },
    persist: {
        serializer: {
            deserialize: parse,
            serialize: stringify,
        },
    },
})
