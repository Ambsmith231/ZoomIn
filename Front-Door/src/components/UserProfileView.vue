<script setup>
import { ref, reactive, onMounted } from 'vue';
import { api } from '../api';

const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const form = reactive({
  name: '',
  email: '',
  phone: '',
  momoProvider: 'MTN Mobile Money'
});

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const parsed = JSON.parse(storedUser);
      form.name = parsed.name || '';
      form.email = parsed.email || '';
      form.phone = parsed.phone || '';
      form.momoProvider = parsed.momoProvider || 'MTN Mobile Money';
    } catch (e) {
      // Fallback
    }
  }
});

const handleUpdateProfile = async () => {
  loading.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  try {
    // API update call simulation or endpoint integration
    const updated = await api.updateProfile({
      name: form.name,
      phone: form.phone,
      momoProvider: form.momoProvider
    });

    // Update local storage session cache
    const current = JSON.parse(localStorage.getItem('user') || '{}');
    const newSession = { ...current, ...form };
    localStorage.setItem('user', JSON.stringify(newSession));

    successMessage.value = 'Profile updated successfully.';
  } catch (err) {
    errorMessage.value = err.message || 'Failed to update profile info.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-stone-900 text-stone-100 font-sans px-6 py-12">
    <div class="max-w-2xl mx-auto">
      <!-- Section Header -->
      <div class="mb-8 border-b border-stone-800 pb-6">
        <h1 class="text-2xl font-light tracking-wide text-white">Account Settings</h1>
        <p class="text-stone-400 text-xs mt-1 uppercase tracking-wider">Manage your personal credentials and mobile money profile</p>
      </div>

      <!-- Feedback Alerts -->
      <div v-if="successMessage" class="mb-6 bg-emerald-950/40 border border-emerald-500/30 p-4 text-emerald-400 text-xs tracking-wide">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="mb-6 bg-red-950/40 border border-red-500/30 p-4 text-red-400 text-xs tracking-wide">
        {{ errorMessage }}
      </div>

      <!-- Profile Form Card -->
      <div class="bg-stone-950 border border-stone-800 p-8 space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-[10px] uppercase tracking-widest text-stone-400 mb-2">Full Name</label>
            <input 
              v-model="form.name" 
              type="text" 
              class="w-full bg-stone-900 border border-stone-800 px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          <div>
            <label class="block text-[10px] uppercase tracking-widest text-stone-400 mb-2">Email Address (Read-only)</label>
            <input 
              v-model="form.email" 
              type="email" 
              disabled 
              class="w-full bg-stone-900/50 border border-stone-800 px-4 py-2.5 text-sm text-stone-500 cursor-not-allowed"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-[10px] uppercase tracking-widest text-stone-400 mb-2">Phone Number / MoMo Line</label>
            <input 
              v-model="form.phone" 
              type="text" 
              placeholder="+231..." 
              class="w-full bg-stone-900 border border-stone-800 px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          <div>
            <label class="block text-[10px] uppercase tracking-widest text-stone-400 mb-2">Preferred Telecom Provider</label>
            <select 
              v-model="form.momoProvider" 
              class="w-full bg-stone-900 border border-stone-800 px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-red-500 transition-colors"
            >
              <option value="MTN Mobile Money">MTN Mobile Money</option>
              <option value="Orange Money">Orange Money</option>
            </select>
          </div>
        </div>

        <div class="pt-4 border-t border-stone-800 flex justify-end">
          <button 
            @click="handleUpdateProfile" 
            :disabled="loading"
            class="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 text-xs font-medium uppercase tracking-widest transition-colors disabled:opacity-50"
          >
            {{ loading ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>