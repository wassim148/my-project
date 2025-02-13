<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-center mb-6">Gestion des congés</h1>

        <!-- Formulaire de demande de congé -->
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
                    v-model="leave.reason"
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

        <!-- Liste des congés -->
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
                        'text-green-500': conge.statut === 'approuvé',
                        'text-yellow-500': conge.statut === 'en attente',
                    }"
                >
                    ({{ conge.statut }})
                </span>
            </li>
        </ul>

        <!-- Nouvelle demande de congé -->
        <!-- <div class="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-8">
            <h2 class="text-2xl font-bold text-center mb-6">Nouvelle demande de congé</h2>
            <form @submit.prevent="submitLeaveRequest">
                <div class="mb-4">
                    <label for="type" class="block text-sm font-medium text-gray-700 mb-2">Type de congé :</label>
                    <input
                        v-model="leave.type"
                        type="text"
                        placeholder="Ex : Annuel"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div class="mb-4">
                    <label for="startDate" class="block text-sm font-medium text-gray-700 mb-2">Date de début :</label>
                    <input
                        v-model="leave.startDate"
                        type="date"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div class="mb-4">
                    <label for="endDate" class="block text-sm font-medium text-gray-700 mb-2">Date de fin :</label>
                    <input
                        v-model="leave.endDate"
                        type="date"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    class="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Soumettre
                </button>
            </form>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Conge {
    id: number
    typeConge: string
    dateDebut: string
    dateFin: string
    statut: string
}

const demande = ref({
    numCIN: null,
    typeConge: '',
    dateDebut: '',
    dateFin: '',
})

const conges = ref<Array<Conge>>([
    { id: 1, typeConge: 'Annuel', dateDebut: '2023-01-01', dateFin: '2023-01-10', statut: 'approuvé' },
    { id: 2, typeConge: 'Maladie', dateDebut: '2023-02-01', dateFin: '2023-02-05', statut: 'en attente' },
])

const leave = ref({
    type: '',
    startDate: '',
    endDate: '',
    reason: '',
})

const envoyerDemande = () => {
    console.log('Demande envoyée :', demande.value)
    // Logique pour envoyer la demande au backend
}

const submitLeaveRequest = () => {
    console.log('Demande soumise :', leave.value)
    // Logique pour envoyer la demande au backend
}
</script>
