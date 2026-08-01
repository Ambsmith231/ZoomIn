import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user")),
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,

    isAdmin: (state) => state.user?.role === "admin",

    dashboardRoute: (state) =>
      state.user?.role === "admin" ? "/admin" : "/user",
  },

  actions: {
    login(token, user) {
      this.token = token;
      this.user = user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },

    logout() {
      this.token = null;
      this.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    loadUser() {
      this.token = localStorage.getItem("token");
      this.user = JSON.parse(localStorage.getItem("user"));
    },
  },
});