<template>
  <div class="p-6 rounded-lg shadow-md bg-white max-w-4xl mx-auto">
    <div class="mb-4">
      <h2 class="text-2xl font-bold mb-4">Rapports statistiques</h2>
      <div v-if="statistics">
        <h3 class="text-xl font-semibold mb-2">Nombre total de congés</h3>
        <p>{{ statistics.totalLeaves}} congés</p>
        <h3 class="text-xl font-semibold mb-2">Nombre de congés par employé</h3>
        <ul class="list-disc pl-4">
          <li v-for="(count, employee) in statistics.byEmployee" :key="employee">
            {{ employee }} : {{ count }} congés
          </li>
        </ul>

        <h3 class="text-xl font-semibold mb-2">Nombre de congés par département</h3>
        <ul class="list-disc pl-4">
          <li v-for="(count, department) in statistics.byDepartment" :key="department">
            {{ department }} : {{ count }} congés
          </li>
        </ul>

        <h3 class="text-xl font-semibold mb-2">Taux d’absentéisme global</h3>
        <p>{{ statistics.absenteeismRate !== undefined ? `${statistics.absenteeismRate.toFixed(2)}%` : 'Chargement...' }}</p>
      </div>
      <button class="w-full bg-green-500 text-white font-medium py-2 px-4 rounded-md mt-6 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500" @click="getStatistics">Rafraîchir</button>
    </div>
    <div class="mt-6">
  <h1 class="text-2xl font-bold mb-4">Historique des absences</h1>
  <div class="flex space-x-4 mb-4">
    <button
      class="w-full bg-green-500 text-white font-medium py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      @click="exportToExcel"
    >
      Exporter en Excel
    </button>
    <button
      class="w-full bg-green-500 text-white font-medium py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      @click="exportToPdf"
    >
      Exporter en PDF
    </button>
  </div>
  <table class="w-full border-collapse">
    <thead class="bg-gray-100">
      <tr>
        <th class="p-2 text-left">Nom de l'employé</th>
        <th class="p-2 text-left">Département</th>
        <th class="p-2 text-left">Type de congé</th>
        <th class="p-2 text-left">Date de début</th>
        <th class="p-2 text-left">Date de fin</th>
        <th class="p-2 text-left">Durée</th>
        <th class="p-2 text-left">Raison</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="leave in leaves" :key="leave?.id" class="border-b hover:bg-gray-100">
        <td class="p-2">{{ leave?.username }}</td>
        <td class="p-2">{{ leave?.department }}</td>
        <td class="p-2">{{ leave?.typeConge }}</td>
        <td class="p-2">{{ leave?.startDate }}</td>
        <td class="p-2">{{ leave?.endDate }}</td>
        <td class="p-2">{{ leave?.nombreJours }} jour(s)</td>
        <td class="p-2">{{ leave?.raison }}</td>
      </tr>
    </tbody>
  </table>
</div>
  </div>
</template>

<script setup lang="ts">
import { useHistoryStore } from '@/core/stores/history.store';
import { storeToRefs } from 'pinia';
import { ref, onMounted } from 'vue';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';

const historyStore = useHistoryStore();
const { leaves } = storeToRefs(historyStore);
const { statistics } = storeToRefs(historyStore);

const getLeaves = async () => {
  try {
    await historyStore.fetchLeaves();
  } catch (error) {
    console.error('Error fetching leaves:', error);
  }
};

const getStatistics = async () => {
  try {
    await historyStore.fetchStatistics();
  } catch (error) {
    console.error('Error fetching statistics:', error);
  }
};

const exportToExcel = () => {
  const body = leaves.value.map((leave) => ({
    'Nom de l\'employé': leave.username,
    Département: leave.department,
    'Type de congé': leave.typeConge,
    'Date de début': leave.startDate,
    'Date de fin': leave.endDate,
    Durée: `${leave.nombreJours} jour(s)`,
    Raison: leave.raison,
  }));
  const csv = [
    'Nom de l\'employé,Département,Type de congé,Date de début,Date de fin,Durée,Raison',
    ...body.map((row) =>
      Object.values(row).map((value) => `"${value}"`).join(',')
    ),
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'historique.csv';
  link.click();
};
 
const exportToPdf = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Historique des Congés', 14, 10);

  const headers = [
    ['Nom de l\'employé', 'Département', 'Type de congé', 'Date de début', 'Date de fin', 'Durée', 'Raison']
  ];

  const data = leaves.value.map((leave) => [
    leave.username,
    leave.department,
    leave.typeConge,
    leave.startDate,
    leave.endDate,
    `${leave.nombreJours} jour(s)`,
    leave.raison,
  ]);

  // Utilisation correcte de autoTable avec doc.autoTable(...)
  doc.autoTable({
    head: headers,
    body: data,
    startY: 20,
    theme: 'grid',
    styles: { fontSize: 10 },
  });

  doc.save('historique_conges.pdf');
};


onMounted(getLeaves);
</script>