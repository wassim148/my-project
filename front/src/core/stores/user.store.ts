import { defineStore } from 'pinia';
import { AxiosError } from 'axios';
import { env, ROUTES } from '../constants';
import axios from 'axios';
import type { User } from '@/shared/interfaces/user';
import { useCookies } from 'vue3-cookies';
import { router } from '../routers';

export interface UserStore {
  user: User | null;
  users: User[];
  isAuthenticated: boolean;
  token: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    users: [],
    isAuthenticated: !!useCookies().cookies.get(env.TOKEN_KEY.toString()),
    token: useCookies().cookies.get(env.TOKEN_KEY.toString()) || '',
  }),

  getters: {
    username(): string {
      return this.user?.username || '';
    },

    isAdmin(): boolean {
      return this.user?.role === 'admin' || false;
    },

    employeId(): number | null {
      if (!this.token) {
        throw new Error('No authentication token found');
      }
      return this.user?.id || null;
    }
  },

  actions: {
    async login(data: { email: string; password: string }) {
      try {
        const response = await axios.post<{ token: string; user: User }>(`${env.BACKEND_BASE_URL}/api/auth/login`, data);

        const { cookies } = useCookies();
        cookies.set(env.TOKEN_KEY.toString(), response.data.token);
        this.$patch({ user: response.data.user, isAuthenticated: true, token: response.data.token });
        await router.push(ROUTES.MAIN);
      } catch (error) {
        console.error('Erreur lors de la connexion:', (error as AxiosError).response?.data);
        throw error;
      }
    },

    async signup(data: { username: string; email: string; password: string; role: string; numcin: number; profilePicture: File }) {
      try {
        const response = await axios.post<{ token: string; user: User }>(`${env.BACKEND_BASE_URL}/api/auth/signup`, data);

        const { cookies } = useCookies();
        cookies.set(env.TOKEN_KEY.toString(), response.data.token);
        this.$patch({ user: response.data.user, isAuthenticated: true, token: response.data.token });
        await router.push(ROUTES.MAIN);
      } catch (error) {
        console.error('Erreur lors de l\'inscription:', (error as AxiosError).response?.data);
        throw error;
      }
    },

    async forgetPassword(data: { email: string }) {
      try {
        const response = await axios.post<{ message: string }>(`${env.BACKEND_BASE_URL}/api/auth/forget`, data);

        console.log('Réponse de la demande de réinitialisation:', response.data);
      } catch (error) {
        console.error('Erreur lors de la demande de réinitialisation:', (error as AxiosError).response?.data);
        throw error;
      }
    },

    async resetPassword(data: { token: string; password: string }) {
      try {
        const response = await axios.post<{ message: string }>(`${env.BACKEND_BASE_URL}/api/auth/reset`, data);

        console.log('Réponse de la réinitialisation:', response.data);
      } catch (error) {
        console.error('Erreur lors de la réinitialisation du mot de passe:', (error as AxiosError).response?.data);
        throw error;
      }
    },

    async fetchUsers() {
      try {
        const response = await axios.get<User[]>(`${env.BACKEND_BASE_URL}/api/users`);

        this.$patch({
          users: response.data,
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', (error as AxiosError).response?.data);
        throw error;
      }
    },

    async fetchUser(id: number) {
      try {
        const response = await axios.get<User>(`${env.BACKEND_BASE_URL}/api/users/${id}`);

        this.$patch({
          user: response.data,
        });
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', (error as AxiosError).response?.data);
        throw error;
      }
    },

    async updateUser(id: number, data: Partial<User>) {
      try {
        const response = await axios.put<User>(`${env.BACKEND_BASE_URL}/api/users/${id}`, data);

        this.$patch({
          user: response.data,
        });
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', (error as AxiosError).response?.data);
        throw error;
      }
    },

    async deleteUser(id: number) {
      try {
        await axios.delete(`${env.BACKEND_BASE_URL}/api/users/${id}`);
        this.$patch({
          user: null,
        });
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', (error as AxiosError).response?.data);
        throw error;
      }
    },

    logout() {
      const { cookies } = useCookies();
      cookies.remove(env.TOKEN_KEY.toString());
      this.$patch({ user: null, isAuthenticated: false, token: '' });
      router.push(ROUTES.SIGN_IN);
    }
  },
  persist: true
});

export default useUserStore;

