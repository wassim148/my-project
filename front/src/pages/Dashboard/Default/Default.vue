<template>
    <div class="p-6 rounded-lg shadow-md bg-white max-w-md mx-auto">
      <h2 class="text-2xl font-bold mb-4">Demande de congé</h2>
      <form @submit.prevent="submitLeaveRequest">
        <div class="mb-4">
          <sl-input label="Type de congé" placeholder="Ex : Annuel" v-model="leave.type"></sl-input>
        </div>
        <div class="mb-4">
          <sl-datepicker label="Date de début" v-model="leave.startDate"></sl-datepicker>
        </div>
        <div class="mb-4">
          <sl-datepicker label="Date de fin" v-model="leave.endDate"></sl-datepicker>
        </div>
        <div class="mb-4">
          <sl-textarea label="Motif (optionnel)" v-model="leave.reason"></sl-textarea>
        </div>
        <button type="submit" class="sl-button sl-button--primary w-full">Soumettre</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        leave: {
          type: '',
          startDate: '',
          endDate: '',
          reason: ''
        }
      };
    },
    methods: {
      submitLeaveRequest() {
        console.log('Demande soumise :', this.leave);
        // Logique pour envoyer la demande au backend
      }
    }
  };
  </script>