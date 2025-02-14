<template>
    <div class="p-6 rounded-lg shadow-md bg-white max-w-4xl mx-auto">
      <h2 class="text-2xl font-bold mb-4">Calendrier des absences</h2>
      <sl-calendar v-model="selectedDate" @change="loadEvents"></sl-calendar>
      <div class="mt-4">
        <ul>
          <li v-for="(event, index) in events" :key="index" class="mb-2">
            {{ event }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Calendrier Interactif',
    data() {
      return {
        selectedDate: new Date(),
        events: []
      };
    },
    methods: {
      loadEvents() {
        // Récupère les événements pour la date sélectionnée depuis un service ou une API
        fetch(`https://api.example.com/events?date=${this.selectedDate.toISOString().split('T')[0]}`)
          .then(response => response.json())
          .then(data => {
            this.events = data;
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des événements:', error);
          });
      }
    }
  };
  </script>