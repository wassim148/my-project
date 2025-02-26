import { defineStore } from 'pinia'
import axios from 'axios';
import { env } from '../constants';
import { useToast } from '@/shared/components/ui/toast';

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [] as any[],
  }),
 

  actions: {
    addNotification(notification: any) {
      this.notifications.push(notification)
      this.removeNotificationAfterTimeout(notification)
    },

    removeNotificationAfterTimeout(notification: any, timeout = 5000) {
      setTimeout(() => {
        const index = this.notifications.findIndex(n => n.id === notification.id)
        if (index > -1) {
          this.notifications.splice(index, 1)
        }
      }, timeout)
    },

    clearNotifications() {
      this.notifications = []
    },

    async getNotifications() {
      try {
        const { data } = await axios.get(`${env.BACKEND_BASE_URL}/notifications`)
        this.notifications = data
      } catch (error) {
        console.error(error)
      }
    },
  },
})

const notificationStore = useNotificationStore()

export function useNotification() {
  const toast = useToast()
  return {
    success: (message: string) => {
      notificationStore.addNotification({ type: 'success', message })
      toast.success(message, { timeout: 5000 })
    },
    error: (message: string) => {
      notificationStore.addNotification({ type: 'error', message })
      toast.error(message, { timeout: 5000 })
    },
    info: (message: string) => {
      notificationStore.addNotification({ type: 'info', message })
      toast.info(message, { timeout: 5000 })
    },
    warning: (message: string) => {
      notificationStore.addNotification({ type: 'warning', message })
      toast.warning(message, { timeout: 5000 })
    },
  }
}


