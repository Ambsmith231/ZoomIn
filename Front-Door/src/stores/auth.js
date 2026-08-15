// // THIS WAS CREATED WITH PINIA STORE GENERATOR SO THAT IT CAN BE USED IN VUE 3 PROJECTS
// // AND I DON'T HAVE TO WRITE THE SAME CODE AGAIN AND AGAIN. IT'S A TIME-SAVER AND MAKES MY LIFE EASIER.
// // THIS STORE IS USED TO MANAGE THE AUTHENTICATION STATE OF THE USER. IT STORES THE TOKEN AND USER INFORMATION IN LOCAL STORAGE AND PROVIDES GETTERS AND ACTIONS TO MANAGE THE AUTHENTICATION STATE.
// // AND ALSO IT IS USE FOR LOGOUT AND LOGIN FUNCTIONALITY. IT ALSO PROVIDES A GETTER TO CHECK IF THE USER IS AN ADMIN OR NOT. IT ALSO PROVIDES A GETTER TO GET THE DASHBOARD ROUTE BASED ON THE USER ROLE.  

import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    let user = null

    try {
      user = JSON.parse(localStorage.getItem('user') || 'null')
    } catch (error) {
      console.error('Invalid user data in localStorage:', error)
      localStorage.removeItem('user')
    }

    return {
      token: localStorage.getItem('token'),
      user,
    }
  },

  getters: {
    isLoggedIn: (state) => !!state.token,

    isAdmin: (state) => state.user?.role === 'admin',

    dashboardRoute: (state) =>
      state.user?.role === 'admin' ? '/admin' : '/user',
  },

  actions: {
    login(token, user) {
      this.token = token
      this.user = user

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    },

    logout() {
      this.token = null
      this.user = null

      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    loadUser() {
      this.token = localStorage.getItem('token')

      try {
        this.user = JSON.parse(localStorage.getItem('user') || 'null')
      } catch {
        this.user = null
        localStorage.removeItem('user')
      }
    },
  },
})