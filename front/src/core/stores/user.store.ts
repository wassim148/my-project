import { defineStore } from 'pinia';
import { AxiosError } from 'axios';
import { env, ROUTES } from '../constants';
import axios from 'axios';
import { useCookies } from 'vue3-cookies';
import { router } from '../routers';

// Define interfaces
export interface User {
  id: number;
  username: string;
  email: string;
  role: 'employee' | 'manager' | 'admin';
  numcin?: number; // Added if used in signup
  profilePicture?: string; // Add if needed
}

export interface Project {
  id: number;
  name: string;
  // Add other project fields
}

export interface Department {
  id: number;
  name: string;
  // Add other department fields
}

// interface UserStoreState {
//   user: User | null;
//   users: User[];
//   isAuthenticated: boolean;
//   token: string;
//   projects: Project[];
//   departments: Department[];
// }

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    users: [],
    isAuthenticated: !!useCookies().cookies.get(env.TOKEN_KEY.toString()),
    token: useCookies().cookies.get(env.TOKEN_KEY.toString()) || '',
    projects: [],
    departments: [],
  }),

  getters: {
    username(state): string {
      return state.user?.username || '';
    },
    isAdmin(state): boolean {
      return state.user?.role === 'admin';
    },
    isManager(state): boolean {
      return state.user?.role === 'manager';
    },
    isEmployee(state): boolean {
      return state.user?.role === 'employee';
    },
    employeeId(state): number | null {
      return state.user?.id || null;
    }
  },

  actions: {
    async login(credentials: { email: string; password: string }) {
      try {
        const response = await axios.post<{ token: string; user: User }>(
          `${env.BACKEND_BASE_URL}/api/auth/login`,
          credentials
        );

        const { cookies } = useCookies();
        cookies.set(env.TOKEN_KEY.toString(), response.data.token);
        // cookies.set('role' ,response.data.user.role);
        
        this.$patch({
          user: response.data.user,
          isAuthenticated: true,
          token: response.data.token
        });
        
        await router.push(ROUTES.MAIN);
      } catch (error) {
        console.error('Login error:', (error as AxiosError).response?.data);
        throw error;
      }
    },

    async signup(data: {
      username: string;
      email: string;
      password: string;
      role: string;
      numcin: number;
      profilePicture: File;
    }) {
      // try {
      //   const formData = new FormData();
      //   Object.entries(data).forEach(([key, value]) => {
      //     formData.append(key, value);
      //   });
      //   console.log(formData);
        console.log(data);

        const response = await axios.post<{ token: string; user: User }>(
          `${env.BACKEND_BASE_URL}/api/auth/signup`,
          data
          // { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        const { cookies } = useCookies();
        cookies.set(env.TOKEN_KEY.toString(), response.data.token);
        
        this.$patch({
          user: response.data.user,
          isAuthenticated: true,
          token: response.data.token
        });
        
        await router.push(ROUTES.MAIN);
      // } catch (error) {
      //   console.error('Signup error:', (error as AxiosError).response?.data);
      //   throw error;
      // }
    },

    async fetchUsers(p0: {}) {
      try {
        const response = await axios.get<User[]>(
          `${env.BACKEND_BASE_URL}/api/users`,
          { headers: { Authorization: `Bearer ${this.token}` } }
        );
        
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', (error as AxiosError).response?.data);
        throw error;
      }
    },

    async deleteUser(userId: number) {
      try {
        await axios.delete(
          `${env.BACKEND_BASE_URL}/api/users/${userId}`,
          { headers: { Authorization: `Bearer ${this.token}` } }
        );
        
        this.$patch({
          users: this.users.filter(user => user.id !== userId),
          user: this.user?.id === userId ? null : this.user
        });
      } catch (error) {
        console.error('Error deleting user:', (error as AxiosError).response?.data);
        throw error;
      }
    },

    async updateUser(userId: number, data: Partial<User>) {
      try {
        const response = await axios.patch<User>(
          `${env.BACKEND_BASE_URL}/api/users/${userId}`,
          data,
          { headers: { Authorization: `Bearer ${this.token}` } }
        );
        
        this.user = response.data;
        return response.data;
      } catch (error) {
        console.error('Update error:', (error as AxiosError).response?.data);
        throw error;
      }
    },

    async fetchDepartments() {
      try {
        const response = await axios.get<Department[]>(
          `${env.BACKEND_BASE_URL}/api/departments`,
          { headers: { Authorization: `Bearer ${this.token}` } }
        );
        
        this.departments = response.data;
      } catch (error) {
        console.error('Department fetch error:', error);
        throw error;
      }
    },

    async fetchProjects() {
      try {
        const response = await axios.get<Project[]>(
          `${env.BACKEND_BASE_URL}/api/projects`,
          { headers: { Authorization: `Bearer ${this.token}` } }
        );
        
        this.projects = response.data;
      } catch (error) {
        console.error('Project fetch error:', error);
        throw error;
      }
    },

    logout() {
      const { cookies } = useCookies();
      cookies.remove(env.TOKEN_KEY.toString());
      this.$reset();
      router.push(ROUTES.SIGN_IN);
    },

    async uploadProfilePicture(formData: FormData) {
      try {
        const response = await window.$axios.post(
          `${env.BACKEND_BASE_URL}/api/users/upload-avatar`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" }
          }
        );
    
        // if (response.status !== 200) {
        //   throw new Error('Upload failed');
        // }
    
        // Update the user profile with the new avatar
        this.user.avatar = response.data.avatarUrl;  // Assuming the backend returns the avatar URL
        return response.data;  // Returning the response for further use if needed
      } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Upload failed');
      }
    },
    
    // Update Profile Name
    async updateProfile(data) {
      try {
        const response = await window.$axios.patch(`${env.BACKEND_BASE_URL}/api/users/upload-name/${this.user.id}`, data, {
        });

        if (response.status !== 200) throw new Error("Profile update failed");

        // Update the user in the store
        this.user.username = data.username;
      } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
      }
    },
  },
  persist: true
});

export default useUserStore;