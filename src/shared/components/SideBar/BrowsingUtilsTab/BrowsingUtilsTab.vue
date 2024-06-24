<script lang="ts" setup>
import { useFavoritesStore } from '@stores'
import { useHistoryStore } from '@stores'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'

const favoritesStore = useFavoritesStore()
const historyStore = useHistoryStore()
</script>

<template>
    <Tabs default-value="Favorites" class="hidden md:block w-full font-sans">
        <TabsList class="bg-primary text-accent">
            <TabsTrigger
                value="Favorites"
                class="border-0 !shadow-none data-[state=active]:text-accent-foreground bg-none !font-normal"
            >
                Favorites
            </TabsTrigger>
            <TabsTrigger
                value="Recently"
                class="border-0 !shadow-none data-[state=active]:text-muted-foreground bg-none !font-normal"
            >
                Recently
            </TabsTrigger>
        </TabsList>
        <TabsContent value="Favorites" class="pl-6 pt-1">
            <ul class="list-disc marker:text-accent-foreground text-sm font-sans font-normal">
                <li v-for="dashboard in favoritesStore.favorites.slice(0, 3)" :key="dashboard.name">
                    <RouterLink :to="dashboard.path"> {{ dashboard.name }} </RouterLink>
                </li>
            </ul>
        </TabsContent>
        <TabsContent value="Recently" class="pl-6 pt-1">
            <ul class="list-disc marker:text-accent-foreground text-sm font-sans font-normal">
                <li v-for="dashboard in historyStore.history">
                    <RouterLink :to="dashboard.name"> {{ dashboard.name }} </RouterLink>
                </li>
            </ul>
        </TabsContent>
    </Tabs>
</template>
