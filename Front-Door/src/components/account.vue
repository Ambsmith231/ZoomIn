<template>
    <div class="min-h-[80vh] bg-[#f4f4f4] flex items-center justify-center px-6 py-16">
      <div class="max-w-md w-full bg-white p-8 md:p-10 rounded-sm shadow-sm border border-gray-200">
        
        <!-- Header -->
        <div class="text-center mb-8">
          <span class="text-[10px] text-gray-400 font-extrabold tracking-widest uppercase">
            New Customer
          </span>
          <h2 class="text-2xl md:text-3xl font-black tracking-tight text-gray-900 mt-1">
            Create Account
          </h2>
        </div>
  
        <!-- Form -->
        <form @submit.prevent="handleSignup" class="space-y-4">
          <div>
            <label class="block text-[11px] font-extrabold uppercase tracking-wider text-gray-700 mb-1">
              Full Name
            </label>
            <input 
              type="text" 
              v-model="name" 
              placeholder="John Doe" 
              required
              class="w-full bg-white border border-gray-300 rounded-sm px-4 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black transition"
            />
          </div>
  
          <div>
            <label class="block text-[11px] font-extrabold uppercase tracking-wider text-gray-700 mb-1">
              Email Address
            </label>
            <input 
              type="email" 
              v-model="email" 
              placeholder="you@example.com" 
              required
              class="w-full bg-white border border-gray-300 rounded-sm px-4 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black transition"
            />
          </div>
  
          <!-- MoMo Number Field for Instant Checkout -->
          <div>
            <label class="block text-[11px] font-extrabold uppercase tracking-wider text-gray-700 mb-1 flex justify-between items-center">
              <span>MoMo Phone Number</span>
              <span class="text-[9px] text-amber-600 lowercase font-semibold">for express checkout</span>
            </label>
            <div class="relative flex items-center">
              <span class="absolute left-3 text-xs text-gray-400 font-bold"><i class="fas fa-mobile-alt mr-1"></i></span>
              <input 
                type="tel" 
                v-model="phone" 
                placeholder="0881234567 or 0771234567" 
                required
                class="w-full bg-white border border-gray-300 rounded-sm pl-9 pr-4 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black transition"
              />
            </div>
          </div>
  
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label class="block text-[11px] font-extrabold uppercase tracking-wider text-gray-700 mb-1">
                Password
              </label>
              <input 
                type="password" 
                v-model="password" 
                placeholder="••••••••" 
                required
                class="w-full bg-white border border-gray-300 rounded-sm px-4 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black transition"
              />
            </div>
            <div>
              <label class="block text-[11px] font-extrabold uppercase tracking-wider text-gray-700 mb-1">
                Confirm
              </label>
              <input 
                type="password" 
                v-model="confirmPassword" 
                placeholder="••••••••" 
                required
                class="w-full bg-white border border-gray-300 rounded-sm px-4 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black transition"
              />
            </div>
          </div>
  
          <!-- Submit Button -->
          <div class="pt-4">
            <button 
              type="submit" 
              :disabled="loading"
              class="w-full bg-[#ef4444] hover:bg-red-600 disabled:bg-gray-300 text-white font-extrabold text-xs uppercase py-3.5 tracking-widest transition rounded-sm shadow-sm flex items-center justify-center gap-2"
            >
              <i v-if="loading" class="fas fa-spinner fa-spin"></i>
              <span>{{ loading ? 'Creating Account...' : 'Register' }}</span>
            </button>
          </div>
        </form>
  
        <!-- Footer Link -->
        <div class="mt-6 text-center border-t border-gray-100 pt-5">
          <p class="text-xs text-gray-500 font-medium">
            Already have an account? 
            <RouterLink to="/login" class="font-extrabold text-gray-900 hover:underline ml-1" >login</RouterLink>
        
          </p>
        </div>
  
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { api } from '../api';
  
  const router = useRouter();
  
  const name = ref('');
  const email = ref('');
  const phone = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const loading = ref(false);
  
  const handleSignup = async () => {
    if (password.value !== confirmPassword.value) {
      alert("Passwords do not match!");
      return;
    }
  
    loading.value = true;
    try {
      const response = await api.register({
        name: name.value,
        email: email.value,
        phone: phone.value,
        password: password.value
      });
      
      // Auto-login after successful registration
      localStorage.setItem('user', JSON.stringify(response.user));
  
      // Redirect directly to the user dashboard
      router.push('/user');
  
    } catch (err) {
      alert(`Registration failed: ${err.message || 'Please check your inputs and try again.'}`);
    } finally {
      loading.value = false;
    }
  };
  </script>