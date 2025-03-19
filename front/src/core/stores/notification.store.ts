import { defineStore } from 'pinia';
import axios from 'axios';
import { env } from '../constants';


export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [] as Notification[],
    demands: [] as Demand[],
  }),

  actions: {
    async fetchNotifications() {
      try {
        const { data } = await window.$axios.get(`${env.BACKEND_BASE_URL}/api/notifications`);
        this.notifications = data.notifications ?? [];
        this.demands = data.demands ?? [];
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    },

    addNotification(notification: { id: number; message: string; variant: string }) {
      this.notifications.push({ ...notification, timeAgo: 'Just now' });
      this.removeNotificationAfterTimeout(notification.id);
    },

    removeNotificationAfterTimeout(notificationId: number, timeout = 5000) {
      setTimeout(() => {
        this.notifications = this.notifications.filter(n => n.id !== notificationId);
      }, timeout);
    },

    clearNotifications() {
      this.notifications = [];
    }
  }
});
