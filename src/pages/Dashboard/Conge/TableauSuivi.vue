<template>
    <div class="p-6 rounded-lg shadow-md bg-white max-w-4xl mx-auto">
      <h2 class="text-2xl font-bold mb-4">Suivi des demandes de congés</h2>
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
          <tr v-for="(request, index) in requests" :key="index" class="border-b">
            <td class="p-2">{{ request.employee }}</td>
            <td class="p-2">{{ request.type }}</td>
            <td class="p-2">{{ request.period }}</td>
            <td class="p-2">{{ request.status }}</td>
            <td class="p-2">
              <sl-button variant="success" @click="approve(request)">Approuver</sl-button>
              <sl-button variant="danger" @click="reject(request)">Rejeter</sl-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TableauSuivi',
    data() {
      return {
        requests: [
          { employee: 'John Doe', type: 'Annuel', period: '15/10/2023 - 20/10/2023', status: 'En attente' },
          { employee: 'Jane Smith', type: 'Maladie', period: '20/10/2023 - 22/10/2023', status: 'Approuvé' }
        ]
      };
    },
    methods: {
      approve(request) {
        request.status = 'Approuvé';
      },
      reject(request) {
        request.status = 'Rejeté';
      }
    }
  };
  </script>