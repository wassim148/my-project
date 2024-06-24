<script lang="ts" setup>
import { useRoute } from 'vue-router'
import Button from '@components/ui/button/Button.vue'
import { Icon } from '@iconify/vue'
import { useFavoritesStore } from '@stores'
import { cn } from '@/shared/lib/utils'

const favoritesStore = useFavoritesStore()
const route = useRoute()

const isFavorite = () => {
    if (!route.name) return false
    return favoritesStore.isFavorite({ name: route.name.toString(), path: route.fullPath })
}
const ToggleFavorite = () => {
    if (!route.name) return false
    if (!isFavorite()) return favoritesStore.addToFavorite({ name: route.name.toString(), path: route.fullPath })
    favoritesStore.removeFromFavorite({ name: route.name.toString(), path: route.fullPath })
    return true
}
</script>

<template>
    <Button variant="ghost" size="icon" @click="ToggleFavorite">
        <transition :name="isFavorite() ? 'star-spin' : 'star-unspin'" mode="out-in">
            <Icon
                :key="isFavorite() ? 'favorite' : 'not-favorite'"
                :class="cn('star-icon transition-transform duration-200 ease-in', isFavorite() && 'text-primary')"
                :icon="isFavorite() ? 'ph:star-duotone' : 'ph:star'"
            ></Icon>
        </transition>
    </Button>
</template>

<style scoped>
.star-icon {
    @apply transition-all duration-75 ease-in;
}
.star-spin-enter-active,
.star-unspin-enter-active {
    @apply transform;
}

.star-spin-enter-active {
    @apply animate-spin;
}

.star-unspin-enter-active {
    @apply animate-unspin;
}
</style>
