<template>
    <div class="p-6 rounded-lg shadow-md bg-white max-w-4xl mx-auto">
      <h2 class="text-2xl font-bold mb-4">Tableau de bord administrateur</h2>
      <div class="mb-4">
        <button @click="fetchLeaveRequests" class="sl-button sl-button--primary">Voir les demandes de congés</button>
      </div>
      <div v-if="leaveRequests.length > 0">
        <table class="w-full border-collapse">
          <thead class="bg-gray-100">
            <tr>
              <th class="p-2 text-left">Employé</th>
              <th class="p-2 text-left">Type</th>
              <th class="p-2 text-left">Période</th>
              <th class="p-2 text-left">Statut</th>
              <th class="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(request, index) in leaveRequests" :key="index" class="border-b">
              <td class="p-2">{{ request.employee.name }}</td>
              <td class="p-2">{{ request.type }}</td>
              <td class="p-2">{{ formatDate(request.startDate) }} - {{ formatDate(request.endDate) }}</td>
              <td class="p-2">{{ request.status }}</td>
              <td class="p-2">
                <sl-button variant="success" @click="approveRequest(request.id)">Approuver</sl-button>
                <sl-button variant="danger" @click="rejectRequest(request.id)">Rejeter</sl-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios'
export default {
  data() {
    return {
      leaveRequests: []
    };
  },
  methods: {
    async LeaveRequests() {
      try {
        const response = await axios.get('/conges');
        this.leaveRequests = response.data;
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
    },
    async approveRequest(id) {
      try {
        await axios.put(`/conges/valider/${id}`);
        this.LeaveRequests();
      } catch (error) {
        console.error('Error approving request:', error);
      }
    },
    async rejectRequest(id) {
      try {
        await axios.put(`/admin/valider/${id}`);
        this.LeaveRequests();
      } catch (error) {
        console.error('Error rejecting request:', error);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
  }
};
</script>
