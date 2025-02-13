<script setup lang="ts">
import '@/assets/index.css'
import { RouterView } from 'vue-router'
import { useUserStore } from '@/core/stores/user.store'

const user = useUserStore()

</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>

