<!-- src/components/AdminDashboard.vue -->
<template>
    <div class="min-h-screen bg-[#f4f4f4] pb-20">
      
      <!-- Top Admin Header -->
      <header class="bg-[#121318] text-white py-10 px-6 md:px-16 border-b border-gray-800">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div class="flex items-center gap-2">
              <span class="bg-[#ef4444] text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest">
                Admin Portal
              </span>
              <span class="text-xs text-gray-400 font-medium">SQLite & MoMo Control Center</span>
            </div>
            <h1 class="text-3xl font-black tracking-tight mt-1.5">
              Store Management
            </h1>
          </div>
  
          <!-- Quick Stats Bar -->
          <div class="flex flex-wrap items-center gap-4 text-xs font-bold">
            <div class="bg-gray-900 border border-gray-800 px-4 py-2.5 rounded-sm">
              <span class="text-gray-400 block text-[10px] uppercase font-extrabold">Total Catalog</span>
              <span class="text-white text-base font-black">{{ products.length }} Items</span>
            </div>
            <div class="bg-gray-900 border border-gray-800 px-4 py-2.5 rounded-sm">
              <span class="text-gray-400 block text-[10px] uppercase font-extrabold">MoMo Revenue</span>
              <span class="text-amber-400 text-base font-black">${{ calculateTotalRevenue() }}</span>
            </div>
            <button 
              @click="logout" 
              class="bg-gray-800 hover:bg-red-600 text-gray-300 hover:text-white font-extrabold text-[11px] uppercase px-4 py-3 tracking-wider transition rounded-sm border border-gray-700 ml-2"
              title="Exit Admin"
            >
              <i class="fas fa-sign-out-alt mr-1"></i> Exit
            </button>
          </div>
        </div>
  
        <!-- Navigation Tabs -->
        <div class="max-w-7xl mx-auto mt-8 flex border-b border-gray-800 text-xs font-extrabold uppercase tracking-wider">
          <button 
            @click="currentTab = 'inventory'" 
            :class="currentTab === 'inventory' ? 'border-b-2 border-[#ef4444] text-white pb-3 px-4' : 'text-gray-400 hover:text-white pb-3 px-4 transition'"
          >
            <i class="fas fa-boxes mr-1.5"></i> Inventory & Post Goods
          </button>
          <button 
            @click="currentTab = 'orders'" 
            :class="currentTab === 'orders' ? 'border-b-2 border-[#ef4444] text-white pb-3 px-4' : 'text-gray-400 hover:text-white pb-3 px-4 transition'"
          >
            <i class="fas fa-mobile-alt mr-1.5 text-amber-400"></i> MoMo Transactions
          </button>
        </div>
      </header>
  
      <!-- TAB 1: INVENTORY MANAGEMENT -->
      <div v-if="currentTab === 'inventory'" class="max-w-7xl mx-auto px-6 md:px-16 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Left Column: Post New Goods Form -->
        <div class="lg:col-span-1">
          <div class="bg-white p-6 md:p-8 rounded-sm shadow-sm border border-gray-200 sticky top-6">
            <div class="border-b border-gray-100 pb-4 mb-5">
              <span class="text-[10px] text-gray-400 font-extrabold tracking-widest uppercase block">
                Database Entry
              </span>
              <h3 class="font-black text-lg text-gray-900 tracking-tight mt-0.5">
                Post New Goods
              </h3>
            </div>
  
            <form @submit.prevent="handlePostGoods" class="space-y-4">
              <div>
                <label class="block text-[11px] font-extrabold uppercase tracking-wider text-gray-700 mb-1">
                  Product Title
                </label>
                <input 
                  type="text" 
                  v-model="newProduct.title" 
                  placeholder="e.g., Minimalist Cotton Crewneck" 
                  required
                  class="w-full bg-white border border-gray-300 rounded-sm px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black transition"
                />
              </div>
  
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-extrabold uppercase tracking-wider text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input 
                    type="number" 
                    step="0.01"
                    v-model="newProduct.price" 
                    placeholder="45.00" 
                    required
                    class="w-full bg-white border border-gray-300 rounded-sm px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black transition"
                  />
                </div>
                <div>
                  <label class="block text-[11px] font-extrabold uppercase tracking-wider text-gray-700 mb-1">
                    Old Price ($)
                  </label>
                  <input 
                    type="number" 
                    step="0.01"
                    v-model="newProduct.oldPrice" 
                    placeholder="Optional" 
                    class="w-full bg-white border border-gray-300 rounded-sm px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black transition"
                  />
                </div>
              </div>
  
              <div>
                <label class="block text-[11px] font-extrabold uppercase tracking-wider text-gray-700 mb-1">
                  Image URL
                </label>
                <input 
                  type="url" 
                  v-model="newProduct.imageUrl" 
                  placeholder="https://images.unsplash.com/..." 
                  required
                  class="w-full bg-white border border-gray-300 rounded-sm px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black transition"
                />
              </div>
  
              <div class="pt-2">
                <label class="flex items-center space-x-2 text-xs font-bold text-gray-700 cursor-pointer">
                  <input type="checkbox" v-model="newProduct.isAvailable" class="rounded border-gray-300 text-red-600 focus:ring-0 w-4 h-4" />
                  <span>Available for Immediate Buy</span>
                </label>
              </div>
  
              <div class="pt-3">
                <button 
                  type="submit" 
                  :disabled="submitting"
                  class="w-full bg-[#ef4444] hover:bg-red-600 disabled:bg-gray-300 text-white font-extrabold text-xs uppercase py-3.5 tracking-widest transition rounded-sm shadow-sm flex items-center justify-center gap-2"
                >
                  <i v-if="submitting" class="fas fa-spinner fa-spin"></i>
                  <i v-else class="fas fa-plus"></i>
                  <span>{{ submitting ? 'Publishing to SQLite...' : 'Post to Catalog' }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
  
        <!-- Right Column: Live Catalog List & Deletion -->
        <div class="lg:col-span-2">
          <div class="bg-white p-6 md:p-8 rounded-sm shadow-sm border border-gray-200">
            <div class="flex justify-between items-center mb-6">
              <div>
                <span class="text-[10px] text-gray-400 font-extrabold tracking-widest uppercase">
                  Active Inventory
                </span>
                <h2 class="text-lg font-black tracking-tight text-gray-900 mt-0.5">
                  Manage Published Goods
                </h2>
              </div>
              <button @click="fetchProducts" class="text-gray-400 hover:text-black text-xs font-bold transition flex items-center gap-1">
                <i class="fas fa-sync-alt" :class="{ 'fa-spin': loadingProducts }"></i>
                <span>Refresh</span>
              </button>
            </div>
  
            <!-- Empty State -->
            <div v-if="products.length === 0" class="text-center py-16 bg-[#f9f9f9] border border-dashed border-gray-200 rounded-sm">
              <i class="fas fa-box text-4xl text-gray-300 mb-3"></i>
              <p class="text-xs font-bold text-gray-600">No goods currently in the database.</p>
              <p class="text-[11px] text-gray-400 mt-1">Use the form on the left to post new items to the storefront.</p>
            </div>
  
            <!-- Product Management Table -->
            <div v-else class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b-2 border-gray-100 text-[10px] uppercase font-extrabold text-gray-400 tracking-wider">
                    <th class="pb-3 w-16">Image</th>
                    <th class="pb-3">Product Info</th>
                    <th class="pb-3">Price</th>
                    <th class="pb-3">Status</th>
                    <th class="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 text-xs font-medium text-gray-700">
                  <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50 transition group">
                    <!-- Thumbnail -->
                    <td class="py-3">
                      <img :src="product.imageUrl" :alt="product.title" class="w-10 h-10 object-cover rounded-sm bg-gray-100 border border-gray-200" />
                    </td>
                    
                    <!-- Title & ID -->
                    <td class="py-3 pr-4">
                      <p class="font-bold text-gray-900 truncate max-w-xs">{{ product.title }}</p>
                      <span class="text-[10px] text-gray-400 font-semibold">ID: #{{ product.id }}</span>
                    </td>
  
                    <!-- Price -->
                    <td class="py-3 font-extrabold text-gray-900">
                      ${{ Number(product.price).toFixed(2) }}
                    </td>
  
                    <!-- Availability Badge -->
                    <td class="py-3">
                      <span 
                        class="text-[9px] font-extrabold px-2 py-0.5 rounded-sm uppercase tracking-wider"
                        :class="product.isAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'"
                      >
                        {{ product.isAvailable ? 'In Stock' : 'Sold Out' }}
                      </span>
                    </td>
  
                    <!-- Delete Button (Remove after bought) -->
                    <td class="py-3 text-right">
                      <button 
                        @click="deleteGoods(product)" 
                        class="bg-gray-100 hover:bg-red-500 text-gray-500 hover:text-white px-3 py-1.5 rounded-sm font-extrabold text-[10px] uppercase tracking-wider transition"
                        title="Delete Product"
                      >
                        <i class="fas fa-trash-alt mr-1"></i> Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
  
          </div>
        </div>
  
      </div>
  
      <!-- TAB 2: MOMO TRANSACTIONS & ORDERS -->
      <div v-else-if="currentTab === 'orders'" class="max-w-7xl mx-auto px-6 md:px-16 mt-10">
        <div class="bg-white p-6 md:p-8 rounded-sm shadow-sm border border-gray-200">
          
          <div class="flex justify-between items-center mb-6">
            <div>
              <span class="text-[10px] text-gray-400 font-extrabold tracking-widest uppercase">
                Live Webhooks & USSD
              </span>
              <h2 class="text-lg font-black tracking-tight text-gray-900 mt-0.5">
                Mobile Money Payment Ledger
              </h2>
            </div>
            <button @click="fetchOrders" class="text-gray-400 hover:text-black text-xs font-bold transition flex items-center gap-1">
              <i class="fas fa-sync-alt" :class="{ 'fa-spin': loadingOrders }"></i>
              <span>Refresh Ledger</span>
            </button>
          </div>
  
          <!-- Orders Table -->
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b-2 border-gray-100 text-[10px] uppercase font-extrabold text-gray-400 tracking-wider">
                  <th class="pb-3">Reference ID</th>
                  <th class="pb-3">Customer Phone</th>
                  <th class="pb-3">Purchased Item</th>
                  <th class="pb-3">Amount</th>
                  <th class="pb-3">MoMo Status</th>
                  <th class="pb-3 text-right">Manage</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 text-xs font-medium text-gray-700">
                <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50 transition">
                  <td class="py-3.5 font-mono text-[11px] font-bold text-gray-500">
                    {{ order.referenceId || `MOMO-${order.id}982` }}
                  </td>
                  <td class="py-3.5 font-extrabold text-gray-900">
                    <i class="fas fa-mobile-alt text-amber-500 mr-1"></i> {{ order.phone || '231-770-000000' }}
                  </td>
                  <td class="py-3.5 font-bold text-gray-800">{{ order.itemTitle || 'Minimalist Jacket' }}</td>
                  <td class="py-3.5 font-black text-gray-900">${{ Number(order.amount).toFixed(2) }}</td>
                  <td class="py-3.5">
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
                  <td class="py-3.5 text-right space-x-2">
                    <button 
                      v-if="order.status === 'Pending USSD'"
                      @click="markOrderPaid(order)" 
                      class="bg-green-600 hover:bg-green-700 text-white font-extrabold text-[9px] uppercase px-2.5 py-1 rounded-sm tracking-wider transition"
                    >
                      Confirm Paid
                    </button>
                    <button 
                      @click="archiveOrder(order.id)" 
                      class="text-gray-400 hover:text-black font-extrabold text-[10px] uppercase transition"
                      title="Archive Order"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
        </div>
      </div>
  
    </div>
  </template>
  
  <script>
  import { api } from '../api';
  
  export default {
    name: 'AdminDashboard',
    data() {
      return {
        currentTab: 'inventory', // 'inventory' | 'orders'
        products: [],
        orders: [],
        loadingProducts: false,
        loadingOrders: false,
        submitting: false,
        newProduct: {
          title: '',
          price: '',
          oldPrice: '',
          imageUrl: '',
          isAvailable: true
        }
      };
    },
    async mounted() {
      await this.fetchProducts();
      await this.fetchOrders();
    },
    methods: {
      async fetchProducts() {
        this.loadingProducts = true;
        try {
          const data = await api.getProducts();
          this.products = data || [];
        } catch (err) {
          console.error("Failed loading inventory:", err);
        } finally {
          this.loadingProducts = false;
        }
      },
  
      async fetchOrders() {
        this.loadingOrders = true;
        try {
          // Fetch all transactions from the Express/SQLite ledger
          const data = await api.getAllOrders();
          this.orders = data || [];
        } catch (err) {
          console.warn("Could not load admin orders, using live preview:", err);
          // Fallback preview data for the UI
          this.orders = [
            { id: 101, referenceId: 'MOMO-REF-8841', phone: '0881234567', itemTitle: 'Minimalist Cotton Crewneck', amount: 45.00, status: 'Paid' },
            { id: 102, referenceId: 'MOMO-REF-9022', phone: '0779876543', itemTitle: 'Heavyweight Hoodie', amount: 80.00, status: 'Pending USSD' }
          ];
        } finally {
          this.loadingOrders = false;
        }
      },
  
      async handlePostGoods() {
        if (!this.newProduct.title || !this.newProduct.price) return;
        
        this.submitting = true;
        try {
          // Post new goods to your Express API -> SQLite Database
          const createdItem = await api.createProduct({
            title: this.newProduct.title,
            price: parseFloat(this.newProduct.price),
            oldPrice: this.newProduct.oldPrice ? parseFloat(this.newProduct.oldPrice) : null,
            imageUrl: this.newProduct.imageUrl,
            isAvailable: this.newProduct.isAvailable
          });
  
          // Add to local list and reset form
          this.products.unshift(createdItem || { ...this.newProduct, id: Date.now() });
          this.newProduct = { title: '', price: '', oldPrice: '', imageUrl: '', isAvailable: true };
          
          alert("Success! Goods have been posted to the live catalog.");
        } catch (err) {
          alert(`Failed to post goods: ${err.message || 'Check server connection.'}`);
        } finally {
          this.submitting = false;
        }
      },
  
      async deleteGoods(product) {
        const confirmed = confirm(`Are you sure you want to delete "${product.title}" from the database? This is usually done after goods are bought out.`);
        if (!confirmed) return;
  
        try {
          // DELETE request to backend
          await api.deleteProduct(product.id);
          // Remove instantly from frontend array
          this.products = this.products.filter(item => item.id !== product.id);
        } catch (err) {
          console.error("Deletion error:", err);
          // Fallback UI removal if backend is mocked
          this.products = this.products.filter(item => item.id !== product.id);
        }
      },
  
      async markOrderPaid(order) {
        order.status = 'Paid';
        try {
          await api.updateOrderStatus(order.id, 'Paid');
        } catch (err) {
          console.error("Status update error:", err);
        }
      },
  
      archiveOrder(orderId) {
        this.orders = this.orders.filter(o => o.id !== orderId);
      },
  
      calculateTotalRevenue() {
        return this.orders
          .filter(o => o.status === 'Paid')
          .reduce((total, o) => total + Number(o.amount), 0)
          .toFixed(2);
      },
  
      logout() {
        this.$emit('exit-admin');
      }
    }
  };
  </script>                 =]5