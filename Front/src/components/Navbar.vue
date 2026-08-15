<template>
  <header class="w-full">

    <!-- Top Announcement -->
    <div class="bg-black text-white text-[11px] py-2 px-6 flex justify-between items-center tracking-wider">
      <p>Don't miss our holiday offer - 20% OFF!</p>

      <div class="flex items-center space-x-4 text-gray-300">
        <a href="#" class="hover:text-white transition">
          <i class="fab fa-facebook-f"></i>
        </a>

        <a href="#" class="hover:text-white transition">
          <i class="fab fa-instagram"></i>
        </a>

        <a href="#" class="hover:text-white transition">
          <i class="fab fa-whatsapp"></i>
        </a>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="bg-white border-b border-gray-100 py-4 px-8 flex justify-between items-center sticky top-0 z-50">

      <!-- Logo -->
      <RouterLink
        to="/"
        class="text-2xl font-black tracking-tight text-gray-900 flex items-center"
      >
        <span class="inline-block border-2 border-black rounded px-1 mr-1 text-xl font-bold">
          E
        </span>
        Buy
      </RouterLink>

      <!-- Navigation -->
      <ul class="hidden md:flex space-x-8 text-xs font-bold tracking-widest text-gray-700 uppercase">

        <li>
          <RouterLink
            to="/"
            class="hover:text-red-500 transition"
          >
            Home
          </RouterLink>
        </li>

        <li>
          <a href="#product" class="hover:text-red-500 transition">
            Products
          </a>
        </li>

        <li>
          <a href="#services" class="hover:text-red-500 transition">
            Services
          </a>
        </li>

        <li>
          <a href="#about" class="hover:text-red-500 transition">
            About Us
          </a>
        </li>

        <li>
          <a href="#contact" class="hover:text-red-500 transition">
            Contact
          </a>
        </li>

      </ul>

      <!-- Right Side -->
      <div class="flex items-center gap-5 text-sm">

        <button class="hover:text-black">
          <i class="fas fa-search"></i>
        </button>

        <!-- Guest -->
        <template v-if="authStore.isLoggedIn">

          <RouterLink
            to="/user"
            class="hover:text-red-500 font-semibold"
          >
            Dashboard
          </RouterLink>

          <button
            @click="logout"
            class="bg-black hover:bg-red-500 text-white px-4 py-2 rounded transition"
          >
            Logout
          </button>


        </template>

        <!-- Logged User -->
        <template v-else>

          <RouterLink
            to="/account"
            class="hover:text-red-500 font-semibold"
          >
            Sign Up
          </RouterLink>

          <RouterLink
            to="/login"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition font-semibold"
          >
            Login
          </RouterLink>

        </template>

      </div>

    </nav>

  </header>
</template>


<script setup>

// new code

// import { useRouter } from "vue-router";
// import { useAuthStore } from "@/stores/counter.js";

// const router = useRouter();
// const authStore = useAuthStore();

// const logout = () => {
//   authStore.logout();
//   router.replace("/");
// };


import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/counter.js";
// import { useAuthStore } from "@/stores/counter.js";
// import User from "./User.vue";

const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  router.replace("/");
};


// import { computed } from "vue";
// import { useRouter } from "vue-router";
// import { auth } from "../api";

// const router = useRouter();

// const isLoggedIn = computed(() => auth.isLoggedIn());

// const dashboardRoute = computed(() => {
//   const user = auth.getUser();

//   if (!user) return "/";

//   return user.role === "admin"
//     ? "/admin"
//     : "/user";
// });

// const logout = () => {
//   auth.logout();
//   router.replace("/");
//   // router.push("/");
// };
</script>