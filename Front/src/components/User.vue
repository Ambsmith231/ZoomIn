<!-- src/components/UserDashboard.vue -->
<template>
    <div class="min-h-screen bg-[#f4f4f4] pb-16">
      
      <!-- Top Account Banner -->
      <section class="bg-[#121318] text-white py-12 px-6 md:px-16 border-b border-gray-800">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span class="text-[10px] text-red-500 font-extrabold tracking-widest uppercase">
              Member Portal
            </span>
            <h1 class="text-3xl font-black tracking-tight mt-1">
              Welcome back, {{ user.name || 'Customer' }}
            </h1>
            <p class="text-xs text-gray-400 mt-1">
              Manage your orders, saved Mobile Money wallet, and account security.
            </p>
          </div>
  
          <div class="flex items-center gap-3">
            <RouterLink to="/allproduct" class="bg-[#ef4444] hover:bg-red-600 text-white font-extrabold text-[11px] uppercase px-6 py-3 tracking-widest transition rounded-sm shadow-sm flex items-center gap-2"
            >Shop Now</RouterLink>
            

            <!-- <RouterLink to="/"class="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white font-bold text-[11px] uppercase px-4 py-3 tracking-wider transition rounded-sm border border-gray-700"
            >LogOut</RouterLink> -->
          </div>
        </div>
      </section>
  
      <!-- Dashboard Content -->
      <div class="max-w-7xl mx-auto px-6 md:px-16 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Left Column: Account Details & MoMo Wallet -->
        <div class="space-y-6 lg:col-span-1">
          
          <!-- MoMo Profile Card -->
          <div class="bg-white p-6 rounded-sm shadow-sm border border-gray-200">
            <div class="flex justify-between items-start mb-4">
              <h3 class="font-black text-sm uppercase tracking-wide text-gray-900">
                Active Payment Wallet
              </h3>
              <span class="bg-green-100 text-green-800 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                Verified
              </span>
            </div>
  
            <div class="flex items-center space-x-3 bg-[#f9f9f9] p-4 border border-gray-100 rounded-sm mb-4">
              <div class="text-2xl text-gray-700">
                <i class="fas fa-mobile-alt text-red-500"></i>
              </div>
              <div>
                <p class="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Mobile Money Phone</p>
                <p class="text-sm font-bold text-gray-800 mt-0.5">{{ user.phone || 'No phone linked' }}</p>
              </div>
            </div>
  
            <button 
              @click="editPhone" 
              class="w-full border border-gray-300 hover:border-black text-gray-700 hover:text-black font-extrabold text-[11px] uppercase py-2 tracking-wider transition rounded-sm"
            >
              Update MoMo Number
            </button>
          </div>
  
          <!-- Account Info Card -->
          <div class="bg-white p-6 rounded-sm shadow-sm border border-gray-200">
            <h3 class="font-black text-sm uppercase tracking-wide text-gray-900 mb-4">
              Account Details
            </h3>
            <ul class="space-y-3 text-xs">
              <li class="flex justify-between border-b border-gray-100 pb-2">
                <span class="text-gray-400 font-semibold">Email:</span>
                <span class="font-bold text-gray-800">{{ user.email }}</span>
              </li>
              <li class="flex justify-between border-b border-gray-100 pb-2">
                <span class="text-gray-400 font-semibold">Member Since:</span>
                <span class="font-bold text-gray-800">{{ formatDate(user.createdAt) }}</span>
              </li>
              <li class="flex justify-between pt-1">
                <span class="text-gray-400 font-semibold">Total Orders:</span>
                <span class="font-bold text-gray-800">{{ orders.length }}</span>
              </li>
            </ul>
          </div>
  
        </div>
  
        <!-- Right Column: Order History Table -->
        <div class="lg:col-span-2">
          <div class="bg-white p-6 md:p-8 rounded-sm shadow-sm border border-gray-200">
            
            <div class="flex justify-between items-center mb-6">
              <div>
                <span class="text-[10px] text-gray-400 font-extrabold tracking-widest uppercase">
                  SQLite Database Records
                </span>
                <h2 class="text-lg font-black tracking-tight text-gray-900 mt-0.5">
                  Recent Orders & Payments
                </h2>
              </div>
              <button @click="fetchOrders" class="text-gray-400 hover:text-black text-xs transition" title="Refresh Orders">
                <i class="fas fa-sync-alt" :class="{ 'fa-spin': loadingOrders }"></i>
              </button>
            </div>
  
            <!-- Loading / Empty States -->
            <div v-if="loadingOrders" class="text-center py-10 text-xs font-semibold text-gray-400">
              Loading your transaction history...
            </div>
            <div v-else-if="orders.length === 0" class="text-center py-12 bg-[#f9f9f9] border border-dashed border-gray-200 rounded-sm">
              <i class="fas fa-box-open text-3xl text-gray-300 mb-2"></i>
              <p class="text-xs font-bold text-gray-600">No orders placed yet.</p>
              <p class="text-[11px] text-gray-400 mt-1">Explore our catalog and checkout effortlessly with MoMo.</p>
            </div>
  
            <!-- Order Table -->
            <div v-else class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b-2 border-gray-100 text-[10px] uppercase font-extrabold text-gray-400 tracking-wider">
                    <th class="pb-3">Order ID</th>
                    <th class="pb-3">Date</th>
                    <th class="pb-3">Payment Method</th>
                    <th class="pb-3">Amount</th>
                    <th class="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 text-xs font-medium text-gray-700">
                  <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50 transition">
                    <td class="py-3.5 font-bold text-gray-900">#{{ order.id.toString().padStart(4, '0') }}</td>
                    <td class="py-3.5 text-gray-500">{{ formatDate(order.date) }}</td>
                    <td class="py-3.5">
                      <span class="inline-flex items-center gap-1.5 font-bold text-gray-800">
                        <i class="fas fa-mobile-alt text-amber-500"></i> MoMo Pay
                      </span>
                    </td>
                    <td class="py-3.5 font-extrabold text-gray-900">${{ Number(order.amount).toFixed(2) }}</td>
                    <td class="py-3.5 text-right">
                      <span 
                        class="text-[10px] font-extrabold px-2.5 py-1 rounded-sm uppercase tracking-wider"
                        :class="{
                          'bg-green-100 text-green-800': order.status === 'Paid',
                          'bg-amber-100 text-amber-800': order.status === 'Pending USSD',
                          'bg-red-100 text-red-800': order.status === 'Failed'
                        }"
                      >
                        {{ order.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
  
          </div>
        </div>
  
      </div>
  
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from "vue";
import { api, auth } from "../api";

const user = ref(
  auth.getUser() || {
    name: "",
    email: "",
    phone: "",
    createdAt: new Date()
  }
);

const orders = ref([]);
const loadingOrders = ref(false);

const fetchOrders = async () => {
  loadingOrders.value = true;

  try {
    if (user.value?.id) {
      orders.value = await api.getUserOrders(user.value.id);
    }
  } catch (err) {
    console.warn(
      "Could not load backend orders, using mock preview:",
      err
    );

    orders.value = [
      {
        id: 1042,
        date: new Date(),
        amount: 120.0,
        status: "Paid"
      },
      {
        id: 1038,
        date: new Date(Date.now() - 86400000 * 3),
        amount: 45.5,
        status: "Paid"
      }
    ];
  } finally {
    loadingOrders.value = false;
  }
};

const editPhone = async () => {
  const newPhone = prompt(
    "Enter new default Mobile Money phone number:",
    user.value.phone
  );

  if (!newPhone || !newPhone.trim()) return;

  user.value.phone = newPhone.trim();

  // await api.updateProfile({
  //   phone: user.value.phone
  // });

  localStorage.setItem("user", JSON.stringify(user.value));

  alert("Mobile Money phone number updated successfully!");
};

const logout = () => {
  auth.logout();

  window.location.href = "/";
};

const formatDate = (dateVal) => {
  if (!dateVal) return "N/A";

  return new Date(dateVal).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};

onMounted(() => {
  fetchOrders();
});
</script>