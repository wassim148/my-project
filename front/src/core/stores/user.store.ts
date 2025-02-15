import { defineStore } from "pinia";
import axios from 'axios';

export const useUserStore = defineStore("user", {
  state: () => ({
    user:null,
    isAuthenticated: localStorage.getItem("token") ? true : false,


  }),
  getters: {
  },
  actions: {
    async login(data: any) {
      try {
        const response = await axios.post("/auth/login", data);
        this.user = response.data.user;
        this.isAuthenticated = true;
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } catch (error) {
        throw error;
      }
    },
    async signup(data: any) {
      try {
        const response = await axios.post("/auth/signup", data);
        this.user = response.data.user;
        this.isAuthenticated = true;
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } catch (error) {
        throw error;
      }
    },
    async forgetPassword(data: any) {
      try {
        const response = await axios.post("/auth/forget", data);
        console.log(response);
        
      } catch (error) {
        throw error;
      }
    },
    async resetPassword(data: any) {
      try {
        const response = await axios.post("/auth/reset", data);
        console.log(response);
      } catch (error) {
        throw error;
      }
    },

    async getUsers() {
      try {
        const response = await axios.get("/users");
        
        this.$patch({
          user: response.data
        })
      } catch (error) {
        throw error;
      }
    },

  },
});

export default useUserStore;
