<script setup>
import { auth } from "../api";
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.js';

const authStore = useAuthStore();
const router = useRouter();
const isDropdownOpen = ref(false);
const user = ref({ name: '', email: 'user' });

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser);
    } catch (e) {
      // Fallback if malformed
    }
  }

  // Close dropdown on outside click
  document.addEventListener('click', closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
});

const toggleDropdown = (e) => {
  e.stopPropagation();
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const goToProfile = () => {
  router.push('/user/profile');
};

// import { auth } from "../api";

const logout = () => {
  authStore.logout()
  router.replace('/')
}
</script>

<template>
  <nav class="bg-stone-950 border-b border-stone-800 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <!-- Brand Logo -->
      <div class="flex items-center gap-8">

        <RouterLink
        to="/"
        class="text-2xl font-black tracking-tight text-gray-900 flex items-center"
      >
        <span class="inline-block border-2 border-black rounded px-1 mr-1 text-xl font-bold">
          E
        </span>
        Buy
      </RouterLink>
        <!-- <router-link to="/user" class="text-lg font-light tracking-widest text-white uppercase">
          Garderobe<span class="text-red-500">.</span>
        </router-link> -->
        
        <div class="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest">
          <router-link to="/user" class="text-stone-300 hover:text-red-500 transition-colors">Dashboard</router-link>
          <router-link to="/user/products" class="text-stone-300 hover:text-red-500 transition-colors">Catalog</router-link>
        </div>
      </div>

      <!-- Profile Dropdown Trigger -->
      <div class="relative">
        <button 
          @click="toggleDropdown"
          class="flex items-center gap-3 bg-stone-900 border border-stone-800 px-3 py-1.5 hover:border-stone-700 transition-colors focus:outline-none"
        >
          <div class="w-7 h-7 bg-red-500/10 border border-red-500/30 flex items-center justify-center text-xs font-medium text-red-500 uppercase">
            {{ user.name ? user.name.charAt(0) : 'U' }}
          </div>
          <span class="text-xs font-light text-stone-200 hidden sm:inline">{{ user.name }}</span>
          <svg class="w-3.5 h-3.5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>

        <!-- Dropdown Menu -->
        <div 
          v-if="isDropdownOpen" 
          class="absolute right-0 mt-2 w-48 bg-stone-900 border border-stone-800 shadow-2xl py-1 z-50 text-xs"
        >
          <div class="px-4 py-2.5 border-b border-stone-800">
            <p class="text-stone-400 text-[10px] uppercase tracking-wider">Signed in as</p>
            <p class="text-stone-200 font-medium truncate mt-0.5">{{ user.email }}</p>
          </div>
          
          <button 
            @click="goToProfile" 
            class="w-full text-left px-4 py-2.5 text-stone-300 hover:bg-stone-800 hover:text-white transition-colors flex items-center gap-2"
          >
            <svg class="w-3.5 h-3.5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            Profile Information
          </button>

          <div class="border-t border-stone-800 my-1"></div>

          <button 
            @click="logout" 
            class="w-full text-left px-4 py-2.5 text-red-400 hover:bg-stone-800 hover:text-red-300 transition-colors flex items-center gap-2"
          >
            <svg class="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            Log Out
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>