<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const adminUser = ref({ name: 'Administrator', email: 'admin@example.com' });

onMounted(() => {
  const loadSession = () => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.name) {
          adminUser.value = parsed;
        }
      } catch (e) {}
    }
  };

  loadSession();
  window.addEventListener('storage', loadSession);
});

const logout = () => {
  localStorage.removeItem('user');
  router.push('/');
};
</script>

<template>
  <nav class="bg-stone-950 border-b border-stone-800 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <!-- Left side: Brand, Dashboard Link, & Back button / Quick Nav -->
      <div class="flex items-center gap-6">
        <router-link to="/admin" class="text-lg font-light tracking-widest text-white uppercase flex items-center gap-2">
            <span class="inline-block border-2 border-black rounded px-1 mr-1 text-xl font-bold">E</span>Buy
            <span class="text-[10px] text-red-400 font-mono tracking-normal bg-red-950/40 border border-red-500/30 px-2 py-0.5">Admin</span>
        </router-link>

        <div class="h-4 w-px bg-stone-800 hidden md:block"></div>

        <!-- Links to visit all admin pages -->
        <div class="flex items-center gap-2 text-xs uppercase tracking-widest">
          <router-link 
            to="/admin" 
            :class="[
              'px-3 py-1.5 transition-colors border',
              route.path === '/admin' 
                ? 'bg-stone-900 border-red-500/50 text-white font-medium' 
                : 'border-transparent text-stone-400 hover:text-stone-200 hover:bg-stone-900/50'
            ]"
          >
            Dashboard
          </router-link>

          <router-link 
            to="/admingoods" 
            :class="[
              'px-3 py-1.5 transition-colors border',
              route.path === '/admingoods' 
                ? 'bg-stone-900 border-red-500/50 text-white font-medium' 
                : 'border-transparent text-stone-400 hover:text-stone-200 hover:bg-stone-900/50'
            ]"
          >
            Inventory
          </router-link>

          <router-link 
            to="/post" 
            :class="[
              'px-3 py-1.5 transition-colors border',
              route.path === '/post' 
                ? 'bg-stone-900 border-red-500/50 text-white font-medium' 
                : 'border-transparent text-stone-400 hover:text-stone-200 hover:bg-stone-900/50'
            ]"
          >
            Post Goods
          </router-link>
        </div>
      </div>

      <!-- Right side: Logged-in Admin Profile Card & Logout -->
      <div class="flex items-center gap-4">
        <!-- Profile badge showing exact logged-in admin identity -->
        <div class="flex items-center gap-3 bg-stone-900 border border-stone-800 px-3 py-1.5">
          <div class="w-7 h-7 bg-red-500/10 border border-red-500/30 flex items-center justify-center text-xs font-medium text-red-500 uppercase">
            {{ adminUser.name ? adminUser.name.charAt(0) : 'A' }}
          </div>
          <div class="hidden sm:block text-left">
            <p class="text-xs font-light text-stone-200">{{ adminUser.name }}</p>
            <p class="text-[10px] text-stone-400 uppercase tracking-widest font-mono truncate max-w-[140px]">{{ adminUser.email }}</p>
          </div>
        </div>

        <button 
          @click="logout" 
          class="text-xs uppercase tracking-widest text-stone-400 hover:text-red-500 transition-colors px-3 py-1.5 border border-stone-800 hover:border-stone-700 bg-stone-900"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>