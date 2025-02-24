<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-center mb-6">Gestion des congés</h1>

        <form @submit.prevent="envoyerDemande" class="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mb-8">
            <label for="numCIN" class="block text-sm font-medium text-gray-700 mb-2">NUM CIN :</label>
            <input
                v-model.number="demande.numcin"
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
                <label for="reason" class="block text-sm font-medium text-gray-700 mb-2">Description (raison) :</label>
                <textarea
                    v-model="demande.raison"
                    rows="4"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
            </div>
            <div v-if="demande.typeConge == 'maladie'" class="mb-4">
                <label for="justificatif" class="block text-sm font-medium text-gray-700 mb-2">Pièce(s) justificative(s) :</label>
                <input
                    type="file"
                    id="justificatif"
                    ref="fileInput"
                    multiple
                    @change="handleFileChange"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <p v-if="selectedFiles.length > 0" class="text-sm text-gray-500 mt-2">
                    Fichiers sélectionnés : {{ selectedFiles.map(file => file.name).join(', ') }}
                </p>
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
                :key="conge?.id"
                class="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
            >
                <span>{{ conge?.typeConge }} du {{ conge?.dateDebut }} au {{ conge?.dateFin }}</span>
                <span
                    :class="{
                        'text-green-500': conge.status === 'accepted',
                        'text-red-500': conge.status === 'refused',
                        'text-yellow-500': conge.status === 'waiting',
                    }"
                >
                    ({{ conge.status }})
                </span>
            </li>
        </ul>
        <button @click="fetchConges">Rafraîchir</button>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useCongeStore } from '@/core/stores/conge.store'
import { useUserStore } from '@/core/stores/user.store'
import { storeToRefs } from 'pinia'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { toTypedSchema } from '@vee-validate/zod';
import * as z  from 'zod';
import { useForm } from 'vee-validate'

const formSchema = toTypedSchema(
  z.object({
    numcin: z.string().min(8, { message: 'CIN must be at least 8 digits.' }),
    typeConge: z.string().min(1, { message: 'Type de congé is required.' }),
    dateDebut: z.string().refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid start date.' }),
    dateFin: z.string().refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid end date.' }),
    raison: z.string().min(5, { message: 'Description must be at least 5 characters.' }),
  }),
);

const { handleSubmit, errors } = useForm({
  validationSchema: formSchema,
});

const congeStore = useCongeStore()
const userStore = useUserStore()
const { conges } = storeToRefs(congeStore)

const demande = reactive({
    numcin: '',
    typeConge: '',
    dateDebut: new Date().toISOString().split('T')[0],
    dateFin: new Date().toISOString().split('T')[0],
    raison: '',

})

const fileInput = ref<HTMLInputElement | null>(null)
const selectedFiles = ref<File[]>([])

const handleFileChange = () => {
    if (fileInput.value && fileInput.value.files) {
        selectedFiles.value = Array.from(fileInput.value.files)
    }
}

const envoyerDemande = async () => {
    const employeId = userStore.user?.id
    const username = userStore.user?.username
    const formData = new FormData()
    formData.append('numcin', demande.numcin)
    formData.append('typeConge', demande.typeConge)
    formData.append('dateDebut', demande.dateDebut)
    formData.append('dateFin', demande.dateFin)
    formData.append('raison', demande.raison)
    formData.append('employeId', employeId)
    formData.append('username', username)

    selectedFiles.value.forEach((file, index) => {
        formData.append(`files[${index}]`, file)
    })

    
    await congeStore.createConge(formData, employeId, username)

    demande.numcin = ''
    demande.typeConge = ''
    demande.dateDebut = ''
    demande.dateFin = ''
    demande.raison = ''
    selectedFiles.value = []
    if (fileInput.value) {
        fileInput.value.value = '' 
    }
}
const fetchConges = () => {
    congeStore.fetchConges()
}
</script>

