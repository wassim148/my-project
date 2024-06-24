<script lang="ts" setup>
import Button from '@components/ui/button/Button.vue'
import { Icon } from '@iconify/vue'
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()

const changeMode = () => {
    const currentMode = mode.value
    if (currentMode == 'dark') mode.value = 'light'
    else mode.value = 'dark'
}
</script>

<template>
    <Button variant="ghost" size="icon" @click="changeMode()">
        <transition name="dark-mode-transition" mode="out-in">
            <Icon
                class="transition-all duration-75 ease-in"
                :icon="mode == 'dark' ? 'ph:moon-stars-duotone' : 'ph:sun-duotone'"
                :key="mode == 'dark' ? 'moon' : 'sun'"
            ></Icon>
        </transition>
    </Button>
</template>

<style scoped>
.dark-mode-transition-enter-active,
.dark-mode-transition-leave-active {
    @apply transition-transform duration-500;
}
.dark-mode-transition-enter-from {
    @apply rotate-90 scale-0;
}
.dark-mode-transition-enter-to {
    @apply rotate-0 scale-100;
}
.dark-mode-transition-leave-from {
    @apply rotate-0 scale-100;
}
.dark-mode-transition-leave-to {
    @apply -rotate-90 scale-0;
}
</style>
