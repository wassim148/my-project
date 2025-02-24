import { defineStore } from 'pinia';
import axios from 'axios';
import { env } from '../constants';
import type { Conge } from '@/shared/interfaces/conge';
import {useUserStore} from './user.store';

export const useCongeStore = defineStore('conge', {
    state: () => ({
        conges: [] as any,
        // Allconge: [] as any,
    }),
    getters: {
        sortedConges(): Conge[] {
            return [...this.conges].sort((a, b) =>
                new Date(a.dateDebut).getTime() - new Date(b.dateDebut).getTime()
            );
        },
        pendingConges(): Conge[] {
            return this.conges.filter((conge) => conge.status === 'waiting');
        },
        acceptedConges(): Conge[] {
            return this.conges.filter((conge) => conge.status === 'accepted');
        },
        rejectedConges(): Conge[] {
            return this.conges.filter((conge) => conge.status === 'refused');
        },
    },
    actions: {
        async fetchConges() {
            try {
                const response = await window.$axios.get(`${env.BACKEND_BASE_URL}/api/conges`);
                
                this.$patch({conges:response})
                 
            } catch (error: any) {
                if (error.response && error.response.status === 401) {
                    console.error('Unauthorized access. Please log in again.');
                    throw new Error('Unauthorized access. Please log in again.');
                } else {
                    console.error('Erreur lors de la récupération des congés:', error.message || error);
                    throw error;
                }
            }
        },
        
        // async fetchCongestypes() {
        //     try {
        //         const response = await window.$axios.get(
        //             `${env.BACKEND_BASE_URL}/api/conges/AllConges`,
        //         );
        //         this.$patch({conges:response})
        //         return response.data;
        //     } catch (error: any) {
        //         console.error('Erreur lors de la récupération des types de congés:', error.message || error);
        //         throw error;
        //     }
        // },

        async createConge(conge: Conge): Promise<void> {
            try {
                const response = await window.$axios.post(
                    `${env.BACKEND_BASE_URL}/api/conges/creer`,
                    conge,
                );
                console.log(conge);
                this.conges.push(response.data);
            } catch (error: any) {
                console.error('Erreur lors de la création du congé:', error.message || error);
                throw error;
            }
        },
        async updateConge(conge: Conge, employeId: number): Promise<void> {
            try {
                const response = await window.$axios.put<Conge>(
                    `${env.BACKEND_BASE_URL}/api/conges/${conge.id}`,
                    conge,
                );
                const index = this.conges.findIndex((c) => c.id === conge.id);
                if (index !== -1) {
                    this.conges.splice(index, 1, response.data);
                }
            } catch (error: any) {
                console.error('Erreur lors de la mise à jour du congé:', error.message || error);
                throw error;
            }
        },
        async deleteConge(id: number): Promise<void> {
            try {
                await window.$axios.delete(`${env.BACKEND_BASE_URL}/api/conges/${id}`);
                this.conges = this.conges.filter((c) => c.id !== id);
            } catch (error: any) {
                console.error('Erreur lors de la suppression du congé:', error.message || error);
                throw error;
            }
        },

    },
});


