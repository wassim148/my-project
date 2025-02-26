<template>
  <div class="p-6 rounded-lg shadow-md bg-white max-w-4xl mx-auto">
      <h2 class="text-2xl font-bold mb-4">Tableau de bord administrateur</h2>
      <div class="mb-4">
        <button @click="fetchLeaveRequests" class="w-full bg-green-500 text-white font-medium py-2 px-4 rounded-md mt-6 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">Voir les demandes de congés</button>
      </div>
      <div v-if="leaveRequests.length > 0">
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
          <tr v-for="(request, index) in leaveRequests" :key="index" class="border-b">
            <td class="p-2">{{ request.username }}</td>
            <td class="p-2">{{ request.typeConge }}</td>
            <td class="p-2">
              {{ formatDate(request.startDate) }} - {{ formatDate(request.endDate) }}
            </td>
            <td class="p-2">
              <span
                :class="{
                  'text-green-500': request.status === 'accepted',
                  'text-red-500': request.status === 'refused',
                  'text-yellow-500': request.status === 'waiting',
                }"
              >
                {{ request.status }}
              </span>
            </td>
            <td class="p-2 flex gap-2">
              <button
                @click="approveRequest(request.id)"
                class="sl-button sl-button--success"
              >
                Approuver
              </button>
              <button
                @click="rejectRequest(request.id)"
                class="sl-button sl-button--danger"
              >
                Rejeter
              </button>
              <button
                @click="deleteRequest(request.id)"
                class="sl-button sl-button--warning"
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center text-gray-500">
      Aucune demande de congé n'est actuellement disponible.
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useLeaveRequestStore } from '@/core/stores/leaveRequest.store';
import { storeToRefs } from 'pinia'


const leaveRequestStore = useLeaveRequestStore();
const { leaveRequests } = storeToRefs(leaveRequestStore);

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const approveRequest = async (id: number) => {
  try {
    await leaveRequestStore.updateLeaveRequest(id, { status: 'accepted' });
  } catch (error) {
    console.error('Erreur lors de l\'approbation de la demande:', error);
  }
};

const rejectRequest = async (id: number) => {
  try {
    await leaveRequestStore.updateLeaveRequest(id, { status: 'refused' });
  } catch (error) {
    console.error('Erreur lors du rejet de la demande:', error);
  }
};

const deleteRequest = async (id: number) => {
  try {
    await leaveRequestStore.deleteLeaveRequest(id);
  } catch (error) {
    console.error('Erreur lors de la suppression de la demande:', error);
  }
};

const fetchLeaveRequests = async () => {
  try {
    await leaveRequestStore.fetchLeaveRequests();
  } catch (error) {
    console.error('Erreur lors de la récupération des demandes de congés:', error);
  }
};

// Appel automatique au montage
onMounted(fetchLeaveRequests);
</script>

<style scoped>
.sl-button {
  @apply py-2 px-4 rounded-md focus:outline-none;
}

.sl-button--primary {
  @apply bg-blue-500 text-white hover:bg-blue-600;
}

.sl-button--success {
  @apply bg-green-500 text-white hover:bg-green-600;
}

.sl-button--danger {
  @apply bg-red-500 text-white hover:bg-red-600;
}

.sl-button--warning {
  @apply bg-orange-500 text-white hover:bg-orange-600;
}
</style>