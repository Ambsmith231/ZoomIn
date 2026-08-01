<template>
    <div class="min-h-[80vh] bg-[#f4f4f4] flex items-center justify-center px-6 py-16">
      <div class="max-w-md w-full bg-white p-8 md:p-10 rounded-sm shadow-sm border border-gray-200">
        
        <!-- Header -->
        <div class="text-center mb-8">
          <span class="text-[10px] text-gray-400 font-extrabold tracking-widest uppercase">
            Account Access
          </span>
          <h2 class="text-2xl md:text-3xl font-black tracking-tight text-gray-900 mt-1">
            Sign In
          </h2>
        </div>
  
        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label class="block text-[11px] font-extrabold uppercase tracking-wider text-gray-700 mb-1.5">
              Email Address
            </label>
            <input 
              type="email" 
              v-model="form.email" 
              placeholder="you@example.com" 
              required
              class="w-full bg-white border border-gray-300 rounded-sm px-4 py-3 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black transition"
            />
          </div>
  
          <div>
            <div class="flex justify-between items-center mb-1.5">
              <label class="block text-[11px] font-extrabold uppercase tracking-wider text-gray-700">
                Password
              </label>
              <a href="#" class="text-[11px] text-gray-500 hover:text-black font-semibold underline">
                Forgot?
              </a>
            </div>
            <input 
              type="password" 
              v-model="form.password" 
              placeholder="••••••••" 
              required
              class="w-full bg-white border border-gray-300 rounded-sm px-4 py-3 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black transition"
            />
          </div>
  
          <!-- Submit Button -->
          <div class="pt-2">
            <button 
              type="submit" 
              :disabled="loading"
              class="w-full bg-[#ef4444] hover:bg-red-600 disabled:bg-gray-300 text-white font-extrabold text-xs uppercase py-3.5 tracking-widest transition rounded-sm shadow-sm flex items-center justify-center gap-2"
            >
              <i v-if="loading" class="fas fa-spinner fa-spin"></i>
              <span>{{ loading ? 'Authenticating...' : 'Sign In' }}</span>
            </button>
          </div>
        </form>
  
        <!-- Footer Link -->
        <div class="mt-8 text-center border-t border-gray-100 pt-6">
          <p class="text-xs text-gray-500 font-medium">
            Don't have an account yet? 
          <RouterLink to="/account" class="font-extrabold text-gray-900 hover:underline ml-1">Creat Account</RouterLink>
          </p>
        </div>
  
      </div>
    </div>
  </template>
  
  <script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "../api";
import { useAuthStore } from "@/stores/stores";

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
  email: "",
  password: "",
});

const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;

  try {
    const response = await api.login({
      email: form.email.trim(),
      password: form.password,
    });

    // Ensure the response contains the required data
    if (!response.token || !response.user) {
      throw new Error("Invalid login response from server.");
    }

    // Save session
    // localStorage.setItem("token", response.token);
    // localStorage.setItem("user", JSON.stringify(response.user));

    authStore.login(response.token, response.user)

    console.log("Login Successful");
    console.log("User:", response.user);

    // Redirect based on role
    if (response.user.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/user");
    }

  } catch (err) {
    console.error(err);

    alert(`Login failed: ${err.message || "Check your credentials."}`);
  } finally {
    loading.value = false;
  }
};
</script>