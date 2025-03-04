import { defineStore } from 'pinia';
import { env } from '../constants';
import { LeaveRequest } from '@/shared/interfaces/LeaveRequest';



export const useLeaveRequestStore = defineStore('leaveRequest', {
  state: () => ({
    leaveRequests: [] as any,
  }),
  actions: {
    async fetchLeaveRequests() {
      try {
        const response = await window.$axios.get(`${env.BACKEND_BASE_URL}/api/conges/all`);        
        this.$patch({leaveRequests:response})
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access. Please log in again.');
            throw new Error('Unauthorized access. Please log in again.');
        } else {
            console.error('Erreur lors de la récupération des congés:', error.message || error);
            throw error;
        }
    }
    },

    async createLeaveRequest(data: Partial<LeaveRequest>) {
      try {
        const response = await window.$axios.post<LeaveRequest>(`${env.BACKEND_BASE_URL}/api/leave-requests`, data);
        this.leaveRequests.push(response.data);
      } catch (error) {
        console.error('Erreur lors de la création de la demande de congé:', error);
        throw error;
      }
    },

    async updateLeaveRequest(id: number, data: Partial<LeaveRequest>) {
      try {
        await window.$axios.put(`${env.BACKEND_BASE_URL}/api/conges/valider/${id}`, data);
        console.log(data);
        const index = this.leaveRequests.findIndex((req) => req.id === id);
        if (index !== -1) {
          this.leaveRequests[index] = { ...this.leaveRequests[index], ...data };
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la demande de congé:', error);
        throw error;
      }
    },

    async deleteLeaveRequest(id: number) {
      try {
        await window.$axios.delete(`${env.BACKEND_BASE_URL}/api/conges/supprimer/${id}`);
        this.leaveRequests = this.leaveRequests.filter((req) => req.id !== id);
      } catch (error) {
        console.error('Erreur lors de la suppression de la demande de congé:', error);
        throw error;
      }
    },
  },
});