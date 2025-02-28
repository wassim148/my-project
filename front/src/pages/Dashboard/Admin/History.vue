<template>
    <div>
      <h1>Historique des absences</h1>
      <button @click="exportToExcel">Exporter en Excel</button>
      <table>
        <thead>
          <tr>
            <th>Employé</th>
            <th>Département</th>
            <th>Date de début</th>
            <th>Date de fin</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="leave in leaves" :key="leave.id">
            <td>{{ leave.employeeName }}</td>
            <td>{{ leave.department }}</td>
            <td>{{ leave.startDate }}</td>
            <td>{{ leave.endDate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        leaves: [],
      };
    },
    mounted() {
      this.fetchLeaves();
    },
    methods: {
      async fetchLeaves() {
        const response = await axios.get('http://localhost:3000/history/leaves');
        this.leaves = response.data;
      },
      async exportToExcel() {
        window.location.href = 'http://localhost:3000/history/export';
      },
    },
  };
  </script>
  