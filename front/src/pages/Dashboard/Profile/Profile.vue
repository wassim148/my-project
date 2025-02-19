<template>
    <div class="space-y-6">
        <h1 class="text-3xl font-bold">Profile</h1>
        <div class="flex space-x-4">
            <div class="flex-1">
                <p class="font-semibold">Name</p>
                <p class="text-sm text-gray-500">{{ userStore.user?.username }}</p>
            </div>
            <div class="flex-1">
                <p class="font-semibold">Email</p>
                <p class="text-sm text-gray-500">{{ userStore.user?.email }}</p>
            </div>
        </div>
        <div class="flex space-x-4">
            <div class="flex-1">
                <p class="font-semibold">Role</p>
                <p class="text-sm text-gray-500">{{ userStore.user?.role }}</p>
            </div>
            <div class="flex-1">
                <p class="font-semibold">Joined</p>
                <p class="text-sm text-gray-500">{{ userStore.user?.created_at }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue"
import { useUserStore } from '@/core/stores/user.store'

const userStore = useUserStore()
onMounted(async () => {
    await userStore.fetchUser()
})
</script>

