<template>
    <div class="p-6 rounded-lg shadow-md bg-white max-w-md mx-auto">
      <h2 class="text-2xl font-bold mb-4">Configuration</h2>
      <ul>
        <li v-for="(setting, index) in settings" :key="index" class="flex items-center justify-between mb-2">
          {{ setting.name }}
          <sl-switch v-model="setting.value"></sl-switch>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        settings: [
          { name: 'Congé annuel activé', value: true },
          { name: 'Congé maladie activé', value: true },
          { name: 'Congé sans solde activé', value: false }
        ]
      };
    }
  };
  </script>