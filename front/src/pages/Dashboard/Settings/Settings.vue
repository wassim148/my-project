<template>
  <div class="p-6 rounded-lg shadow-md bg-white max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4">Gérer les congés</h2>
    
    <label for="conge" class="block mb-2">Sélectionner un congé :</label>
    <select v-model="selectedLeave" class="w-full p-2 border rounded mb-4">
      <option v-for="conge in conges" :key="conge.id" :value="conge.id">
        {{ conge.typeConge }} - {{ conge.startDate }} au {{ conge.endDate }}
      </option>
    </select>
    
    <div v-if="selectedLeave" class="mt-4">
      <label for="newDate" class="block mb-2">Nouvelle date de début :</label>
      <input type="date" v-model="newStartDate" class="w-full p-2 border rounded mb-4" />
      
      <label for="newEndDate" class="block mb-2">Nouvelle date de fin :</label>
      <input type="date" v-model="newEndDate" class="w-full p-2 border rounded mb-4" />
      
      <button @click="updateLeave" class="bg-blue-500 text-white px-4 py-2 rounded mr-2">Modifier</button>
      <button @click="cancelLeave" class="bg-red-500 text-white px-4 py-2 rounded">Annuler</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCongeStore } from "@/core/stores/conge.store";
import { storeToRefs } from "pinia";

interface Leave {
  id: number;
  typeConge: string;
  startDate: string;
  endDate: string;
}

const congeStore = useCongeStore();
const { conges } = storeToRefs(congeStore);

const leaves = ref<Leave[]>([]);
const selectedLeave = ref<number | null>(null);
const newStartDate = ref('');
const newEndDate = ref('');

const fetchLeaves = async () => {
  congeStore.fetchConges();
};

const updateLeave = async () => {
  if (!selectedLeave.value) return;
  await window.$axios.put(`http://localhost:3000/api/conges/change-date/${selectedLeave.value}`, {
    startDate: newStartDate.value,
    endDate: newEndDate.value
  });
  fetchLeaves();
};

const cancelLeave = async () => {
  if (!selectedLeave.value) return;
  await window.$axios.delete(`http://localhost:3000/api/conges/annulé/${selectedLeave.value}`);
  fetchLeaves();
};

onMounted(fetchLeaves);
</script>
