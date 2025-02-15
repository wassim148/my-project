import { defineStore } from 'pinia'
import { parse, stringify } from 'zipson'
import type { Dashboard } from '@interfaces/dashboard'

export interface FavoritesStore {
    favorites: Dashboard[]
}

export const useFavoritesStore = defineStore('favorites', {
    state: (): FavoritesStore => ({
        favorites: [] as Dashboard[],
    }),
    actions: {
        addToFavorite(dashboard: Dashboard) {
            this.$patch((state) => {
                state.favorites.push(dashboard)
            })
        },
        removeFromFavorite(dashboard: Dashboard) {
            const index = this.favorites.findIndex(
                (value) => dashboard.name == value.name && dashboard.path == value.path,
            )
            if (index > -1) {
                this.$patch((state) => {
                    state.favorites.splice(index, 1)
                })
            }
        },
        isFavorite(dashboard: Dashboard) {
            return (
                this.favorites.findIndex((value) => dashboard.name == value.name && dashboard.path == value.path) > -1
            )
        },
    },
    persist: {
        paths: ['favorites'],
        serializer: {
            deserialize: parse,
            serialize: stringify,
        },
    },
})
