import { defineStore } from 'pinia'
import axios from 'axios'
import { env } from '@/constants'
import type { LeaveRequest } from '@/shared/interfaces/leaverequest'

export const useLeaveRequestStore = defineStore('leaveRequest', {
  state: () => ({
    leaveRequests: [] as LeaveRequest[],
  }),

  getters: {
    pendingRequests(): LeaveRequest[] {
      return this.leaveRequests.filter((request) => request.status === 'En attente')
    },
    approvedRequests(): LeaveRequest[] {
      return this.leaveRequests.filter((request) => request.status === 'Approuvé')
    },
    rejectedRequests(): LeaveRequest[] {
      return this.leaveRequests.filter((request) => request.status === 'Rejeté')
    },
  },

  actions: {
    async fetchLeaveRequests() {
      try {
        const response = await axios.get<LeaveRequest[]>(`${env.BACKEND_BASE_URL}/api/leave-requests`)

        this.$patch({
          leaveRequests: response.data,
        })
      } catch (error) {
        console.error('Erreur lors de la récupération des demandes de congés:', (error as AxiosError).response?.data)
        throw error
      }
    },

    async createLeaveRequest(leaveRequest: LeaveRequest) {
      try {
        const response = await axios.post<LeaveRequest>(`${env.BACKEND_BASE_URL}/api/leave-requests`, leaveRequest)

        this.$patch({
          leaveRequests: [...this.leaveRequests, response.data],
        })
      } catch (error) {
        console.error('Erreur lors de la création d\'une demande de congé:', (error as AxiosError).response?.data)
        throw error
      }
    },

    async updateLeaveRequest(leaveRequest: LeaveRequest) {
      try {
        const response = await axios.put<LeaveRequest>(`${env.BACKEND_BASE_URL}/api/leave-requests/${leaveRequest.id}`, leaveRequest)

        this.$patch({
          leaveRequests: this.leaveRequests.map((lr) => lr.id === response.data.id ? response.data : lr),
        })
      } catch (error) {
        console.error('Erreur lors de la mise à jour d\'une demande de congé:', (error as AxiosError).response?.data)
        throw error
      }
    },

    async deleteLeaveRequest(leaveRequestId: number) {
      try {
        await axios.delete(`${env.BACKEND_BASE_URL}/api/leave-requests/${leaveRequestId}`)

        this.$patch({
          leaveRequests: this.leaveRequests.filter((lr) => lr.id !== leaveRequestId),
        })
      } catch (error) {
        console.error('Erreur lors de la suppression d\'une demande de congé:', (error as AxiosError).response?.data)
        throw error
      }
    },
  },
})
