<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-3xl font-bold text-center mb-6">Tableau de Suivi des Employés</h2>
    <table class="w-full border-collapse shadow-lg">
      <thead class="bg-gray-200">
        <tr>
          <th class="p-3 text-left">Employé</th>
          <th class="p-3 text-left">Poste</th>
          <th class="p-3 text-left">Statut</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id" class="border-b hover:bg-gray-100">
          <td class="p-3">{{ employee.name }}</td>
          <td class="p-3">{{ employee.position }}</td>
          <td class="p-3 font-bold" :class="getStatusClass(employee.status)">{{ employee.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      employees: [],
    };
  },
  methods: {
    getStatusClass(status) {
      return {
        'text-green-600 bg-green-100 p-2 rounded': status === 'Disponible',
        'text-yellow-600 bg-yellow-100 p-2 rounded': status === 'En congé',
        'text-red-600 bg-red-100 p-2 rounded': status === 'Absent'
      };
    },
    async fetchEmployees() {
      try {
        const response = await axios.get("http://localhost:3000/employees");
        this.employees = response.data;
      } catch (error) {
        console.error("Erreur lors du chargement des employés :", error);
      }
    }
  },
  created() {
    this.fetchEmployees();
  }
};
</script>

<style scoped>
.text-green-600 { color: #155724; }
.text-yellow-600 { color: #856404; }
.text-red-600 { color: #721c24; }
</style>


<!-- <template>
   <div class="p-6 rounded-lg shadow-md bg-white max-w-4xl mx-auto">
     
    <div class="container mx-auto px-4 py-8">
    <h2 class="text-3xl font-bold text-center mb-6">Suivi des demandes de congés</h2>
    <table class="w-full border-collapse">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-2 text-left-3xl font-bold">Employé</th>
          <th class="p-2 text-left-3xl">Type</th>
          <th class="p-2 text-left">Période</th>
          <th class="p-2 text-left">Durée</th>
          <th class="p-2 text-left">Statut</th>
          <th class="p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(request, index) in leaveRequestStore.leaveRequests" :key="index" class="border-b hover:bg-gray-50">
          <td class="p-2">{{ request.employee }}</td>
          <td class="p-2">{{ request.type }}</td>
          <td class="p-2">{{ request.startDate }} - {{ request.endDate }}</td>
          <td class="p-2" :class="getStatusClass(request.status)">{{ request.status }}</td>
          <td class="p-2" >{{ request.nombreJours }} jour(s)</td>
          <td class="p-2 flex gap-2">
            <button class="bg-green-500 text-white py-1 px-3 rounded" @click="approve(request.id)">Approuver</button>
            <button class="bg-red-500 text-white py-1 px-3 rounded" @click="reject(request.id)">Rejeter</button>
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
</script> -->