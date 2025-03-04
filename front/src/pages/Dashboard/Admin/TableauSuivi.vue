<template>
  <div class="p-6 rounded-lg shadow-md bg-white max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Suivi des demandes de congés</h2>
    <table class="w-full border-collapse">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-2 text-left">Employé</th>
          <th class="p-2 text-left">Type</th>
          <th class="p-2 text-left">Période</th>
          <th class="p-2 text-left">Status</th>
          <th class="p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(request, index) in leaveRequestStore.leaveRequests" :key="index" class="border-b">
          <td class="p-2">{{ request.employee }}</td>
          <td class="p-2">{{ request.type }}</td>
          <td class="p-2">{{ request.period }}</td>
          <td class="p-2" :class="getStatusClass(request.status)">{{ request.status }}</td>
          <td class="p-2">
            <sl-button variant="success" @click="approve(request.id)">Approuver</sl-button>
            <sl-button variant="danger" @click="reject(request.id)">Rejeter</sl-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useLeaveRequestStore } from '@/core/stores/leaveRequest.store';

const leaveRequestStore = useLeaveRequestStore();

onMounted(() => {
  leaveRequestStore.fetchLeaveRequests();
});

const getStatusClass = (status: string) => {
  return status === 'Approuvé' ? 'text-green-500' : 'text-red-500';
};

const approve = async (id: number) => {
  await leaveRequestStore.updateLeaveRequest(id, { status: 'Approuvé' });
};

const reject = async (id: number) => {
  await leaveRequestStore.updateLeaveRequest(id, { status: 'Rejeté' });
};
</script>