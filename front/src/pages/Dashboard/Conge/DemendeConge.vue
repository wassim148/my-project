<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-center mb-6">Gestion des congés</h1>
        <form @submit.prevent="envoyerDemande" class="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mb-8">
            <label for="numCIN" class="block text-sm font-medium text-gray-700 mb-2">NUM CIN :</label>
            <input
                v-model.number="demande.numcin"
                type="number"
                required
                placeholder="Entrez votre CIN"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <p v-if="!errors.numcin" class="text-red-500 text-sm mt-1">{{ errors.numcin }}</p>

            <label for="typeConge" class="block text-sm font-medium text-gray-700 mt-4 mb-2">Type de congé :</label>
            <select
                v-model="demande.typeConge"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="annuel">Annuel</option>
                <option value="maladie">Maladie</option>
                <option value="sans solde">Sans solde</option>
            </select>

            <label class="block text-sm font-medium text-gray-700 mt-4 mb-2">Date début :</label>
            <input
                v-model="demande.startDate"
                type="date"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />

            <label class="block text-sm font-medium text-gray-700 mt-4 mb-2">Date fin :</label>
            <input
                v-model="demande.endDate"
                type="date"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />

            <div class="mb-4">
                <label for="reason" class="block text-sm font-medium text-gray-700 mb-2">Description (raison) :</label>
                <textarea
                    v-model="demande.raison"
                    rows="4"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
            </div>

            <div v-if="demande.typeConge === 'maladie'" class="mb-4">
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
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useCongeStore } from '@/core/stores/conge.store';
import { useUserStore } from '@/core/stores/user.store';
import { useForm } from 'vee-validate';
import { storeToRefs } from 'pinia';
import { Conge } from '@/core/types/conge.type';

const formSchema = {
    numcin: (value: number) => !!value || 'Le numéro CIN est requis.',
    typeConge: (value: string) => !!value || 'Le type de congé est requis.',
    startDate: (value: Date) => !!value || 'La date de début est requise.',
    endDate: (value: Date) => !!value || 'La date de fin est requise.',
    raison: (value: string) => (value && value.length >= 5) || 'La description doit contenir au moins 5 caractères.',
};

const { handleSubmit, errors } = useForm({
    validationSchema: formSchema,
});

const demande = reactive({
    numcin: '',
    typeConge: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    raison: '',
});

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFiles = ref<File[]>([]);

const handleFileChange = () => {
    if (fileInput.value && fileInput.value.files) {
        selectedFiles.value = Array.from(fileInput.value.files);
    }
};

const congeStore = useCongeStore();
const userStore = useUserStore();
const { conges } = storeToRefs(congeStore);

const envoyerDemande = async () => {
    const employeId = userStore.user?.id;
    const username = userStore.user?.username;

    const congeData: Conge = {
      numcin: demande.numcin,
      typeConge: demande.typeConge,
      startDate: demande.startDate,
      endDate: demande.endDate,
      raison: demande.raison,
      employeId: employeId,
      username: username,
      files: selectedFiles.value,
    };
    console.log(congeData);
    
    await congeStore.createConge(congeData);
    demande.numcin = '';
    demande.typeConge = '';
    demande.startDate = '';
    demande.endDate = '';
    demande.raison = '';
    selectedFiles.value = [];
    if (fileInput.value) {
        fileInput.value.value = ''; 
    }
};
</script>
