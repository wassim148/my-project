<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-center mb-6">Gestion des congés</h1>

        <form @submit.prevent="envoyerDemande" class="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mb-8">
            <label for="numCIN" class="block text-sm font-medium text-gray-700 mb-2">NUM CIN :</label>
            <input
                v-model.number="demande.numCIN"
                type="number"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />

            <label for="typeConge" class="block text-sm font-medium text-gray-700 mt-4 mb-2">Type de congé :</label>
            <select
                v-model="demande.typeConge"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="annuel">Annuel</option>
                <option value="maladie">Maladie</option>
                <option value="sans solde">Sans solde</option>
            </select>

            <label class="block text-sm font-medium text-gray-700 mt-4 mb-2">Date début :</label>
            <input
                v-model="demande.dateDebut"
                type="date"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />

            <label class="block text-sm font-medium text-gray-700 mt-4 mb-2">Date fin :</label>
            <input
                v-model="demande.dateFin"
                type="date"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />

            <div class="mb-4">
                <label for="reason" class="block text-sm font-medium text-gray-700 mb-2">Description (reason) :</label>
                <textarea
                    v-model="demande.reason"
                    rows="4"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
            </div>

            <button
                type="submit"
                class="w-full bg-green-500 text-white font-medium py-2 px-4 rounded-md mt-6 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
                Soumettre
            </button>
        </form>

        <h2 class="text-2xl font-semibold text-center mb-6">Mes demandes de congé</h2>
        <ul class="space-y-4">
            <li
                v-for="conge in conges"
                :key="conge.id"
                class="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
            >
                <span>{{ conge.typeConge }} du {{ conge.dateDebut }} au {{ conge.dateFin }}</span>
                <span
                    :class="{
                        'text-green-500': conge.statut === 'accepete',
                        'text-red-500': conge.statut === 'refus',
                        'text-yellow-500': conge.statut === 'en attente',
                    }"
                >
                    ({{ conge.statut }})
                </span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Error from '@/shared/components/error/Error.vue'

interface Conge {
    id: number
    typeConge: string
    dateDebut: string
    dateFin: string
    statut: string
}

const demande = ref<Conge>({
    numCIN: null,
    typeConge: '',
    dateDebut: '',
    dateFin: '',
    reason: '',
    statut: 'en attente'
})

const conges = ref<Conge[]>([])

const fetchConges = async () => {
    try {
        const response = await axios.get('/api/conges',demande.value)
        conges.value = response.data
    } catch (error) {
        return {
            error: true,
            message: error.response.data.message
        }
    }
}

const envoyerDemande = async () => {
    try {
        const response = await axios.post('api/conges/creer', demande.value)
        conges.value.push(response.data)
        demande.value = {
            numCIN: null,
            typeConge: '',
            dateDebut: '',
            dateFin: '',
            reason: '',
            statut: 'en attente'
        }
        return response.data
    } catch (error) {
        console.error('Erreur lors de l envoi de la demande de congé:', error)
        return {
            error: true,
            message: error.response.data.message
        }
    }
}

onMounted(fetchConges)
</script>

