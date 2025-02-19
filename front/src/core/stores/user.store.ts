import { defineStore } from 'pinia';
import { AxiosError } from 'axios';
import { env, ROUTES } from '../constants';
import axios from 'axios';
import type { User } from '@/shared/interfaces/user';
import { useCookies } from 'vue3-cookies';
import { router } from '../routers';

export interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
}

export const useUserStore = defineStore('user', {
  state: (): UserStore => ({
    user: null,
    isAuthenticated: !!useCookies().cookies.get(env.TOKEN_KEY.toString()),
  }),

  getters: {
    username(): string {
      return this.user?.username || '';
    },

    isAdmin(): boolean {
      return this.user?.role === 'admin' || false;
    },
  },

  actions: {
    async login(data: { email: string; password: string }): Promise<void> {
      try {
        const response = await axios.post<{ token: string; user: User }>(`${env.BACKEND_BASE_URL}/api/auth/login`, data);

        const { cookies } = useCookies();
        cookies.set(env.TOKEN_KEY.toString(), response.data.token);
        this.$patch({ user: response.data.user, isAuthenticated: true });
        await router.push(ROUTES.MAIN);
      } catch (error) {
        console.error('Erreur lors de la connexion:', (error as AxiosError).response?.data);
        throw error;
      }
    },

    async signup(data: { username: string; email: string; password: string; role: string; numcin: number; profilePicture: File }): Promise<void> {
      try {
        const response = await axios.post<{ token: string; user: User }>(`${env.BACKEND_BASE_URL}/api/auth/signup`, data);

        const { cookies } = useCookies();
        cookies.set(env.TOKEN_KEY.toString(), response.data.token);
        this.$patch({ user: response.data.user, isAuthenticated: true });
        await router.push(ROUTES.MAIN);
      } catch (error) {
        console.error('Erreur lors de l\'inscription:', (error as AxiosError).response?.data);
        throw error;
      }
    },

    async forgetPassword(data: { email: string }): Promise<void> {
      try {
        const response = await axios.post<{ message: string }>(`${env.BACKEND_BASE_URL}/api/auth/forget`, data);

        console.log('Réponse de la demande de réinitialisation:', response.data);
      } catch (error) {
        console.error('Erreur lors de la demande de réinitialisation:', (error as AxiosError).response?.data);
        throw error;
      }
    },

    async resetPassword(data: { token: string; password: string }): Promise<void> {
      try {
        const response = await axios.post<{ message: string }>(`${env.BACKEND_BASE_URL}/api/auth/reset`, data);

        console.log('Réponse de la réinitialisation:', response.data);
      } catch (error) {
        console.error('Erreur lors de la réinitialisation du mot de passe:', (error as AxiosError).response?.data);
        throw error;
      }
    },

    async fetchUsers(): Promise<void> {
      try {
        const response = await axios.get<User[]>(`${env.BACKEND_BASE_URL}/api/users`);

        this.$patch({
          user: response.data,
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', (error as AxiosError).response?.data);
        throw error;
      }
    },

    logout(): void {
      const { cookies } = useCookies();
      cookies.remove(env.TOKEN_KEY.toString());
      this.user = null;
      this.isAuthenticated = false;
      router.push(ROUTES.SIGN_IN);
    },
  },
  persist: true,
});

export default useUserStore;

