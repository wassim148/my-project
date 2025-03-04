<template>
    <h2 class="text-2xl font-semibold text-center mb-6">Mes demandes de congé</h2>
    <ul class="space-y-4">
        <li
            v-for="conge in conges"
            :key="conge?.id"
            class="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
        >
            <span>conge {{ conge?.typeConge }} du     {{ conge?.startDate }} au    {{ conge?.endDate }}</span>
            <span
                :class="{
                    'text-green-500': conge?.status === 'accepted',
                    'text-red-500': conge?.status === 'refused',
                    'text-yellow-500': conge?.status === 'waiting',
                }"
            >
                ({{ conge?.status }})
            </span>
        </li>
    </ul>
    <button @click="fetchConges" class="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
        Rafraîchir
    </button>
</template>

<script setup lang="ts">
import { useCongeStore } from "@/core/stores/conge.store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const congeStore = useCongeStore();
const { conges } = storeToRefs(congeStore);

const fetchConges = () => {
    congeStore.fetchConges();
};
onMounted(fetchConges);
</script>

<style scoped>

</style>
