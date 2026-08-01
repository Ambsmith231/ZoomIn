<!-- src/components/admin/AdminInventoryList.vue -->
<template>
    <div class="bg-white p-6 md:p-8 rounded-sm shadow-sm border border-gray-200">
      
      <!-- Table Toolbar -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-gray-100">
        <div>
          <span class="text-[10px] text-gray-400 font-extrabold tracking-widest uppercase">
            Database Records
          </span>
          <h2 class="text-lg font-black tracking-tight text-gray-900 mt-0.5">
            Published Catalog Items
          </h2>
        </div>
  
        <!-- Quick Search Filter within Admin -->
        <div class="relative w-full sm:w-64">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Filter goods by name..." 
            class="w-full bg-[#f9f9f9] border border-gray-300 rounded-sm px-3 py-1.5 text-xs text-gray-800 focus:bg-white focus:outline-none focus:border-black transition pr-8"
          />
          <i class="fas fa-search absolute right-3 top-2.5 text-gray-400 text-xs"></i>
        </div>
      </div>
  
      <!-- Empty State (When database is empty) -->
      <div v-if="filteredProducts.length === 0" class="text-center py-16 bg-[#f9f9f9] border border-dashed border-gray-200 rounded-sm">
        <i class="fas fa-box-open text-4xl text-gray-300 mb-3"></i>
        <p class="text-xs font-bold text-gray-600">No goods found matching your criteria.</p>
        <p class="text-[11px] text-gray-400 mt-1">Click the "+ Post New Goods" button above to populate your catalog.</p>
      </div>
  
      <!-- Inventory Table -->
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b-2 border-gray-100 text-[10px] uppercase font-extrabold text-gray-400 tracking-wider">
              <th class="pb-3 w-16">Image</th>
              <th class="pb-3">Product Title</th>
              <th class="pb-3">Category</th>
              <th class="pb-3">Price</th>
              <th class="pb-3">Status</th>
              <th class="pb-3 text-right">Post-Sale Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-xs font-medium text-gray-700">
            <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50 transition">
              
              <!-- Thumbnail -->
              <td class="py-3">
                <img 
                  :src="`http://localhost:5000${product.imageUrl}`"
                  :alt="product.title" 
                  class="w-10 h-10 object-cover rounded-sm bg-gray-100 border border-gray-200" 
                />
              </td>
              
              <!-- Title & ID -->
              <td class="py-3 pr-4 font-bold text-gray-900">
                {{ product.title }}
                <span class="block text-[9px] text-gray-400 font-normal">ID: #{{ product.id }}</span>
              </td>
  
              <!-- Category -->
              <td class="py-3 text-gray-500 font-semibold">{{ product.category || 'Clothing' }}</td>
  
              <!-- Price -->
              <td class="py-3 font-extrabold text-gray-900">${{ Number(product.price).toFixed(2) }}</td>
  
              <!-- Availability Badge -->
              <td class="py-3">
                <span 
                  class="text-[9px] font-extrabold px-2 py-0.5 rounded-sm uppercase tracking-wider"
                  :class="product.isAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'"
                >
                  {{ product.isAvailable ? 'In Stock' : 'Sold Out' }}
                </span>
              </td>
  
              <!-- Delete Button (To remove after bought by client) -->
              <td class="py-3 text-right">
                <button 
                  @click="$emit('delete-product', product)" 
                  class="bg-gray-100 hover:bg-[#ef4444] text-gray-600 hover:text-white px-3 py-1.5 rounded-sm font-extrabold text-[10px] uppercase tracking-wider transition inline-flex items-center gap-1.5 shadow-2xs"
                  title="Remove from database after purchase"
                >
                  <i class="fas fa-trash-alt"></i>
                  <span>Delete</span>
                </button>
              </td>
  
            </tr>
          </tbody>
        </table>
      </div>
  
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdminInventoryList',
    props: {
      products: {
        type: Array,
        required: true,
        default: () => []
      }
    },
    data() {
      return {
        searchQuery: ''
      };
    },
    computed: {
      filteredProducts() {
        if (!this.searchQuery) return this.products;
        const term = this.searchQuery.toLowerCase().trim();
        return this.products.filter(item => 
          item.title.toLowerCase().includes(term) || 
          (item.category && item.category.toLowerCase().includes(term))
        );
      }
    }
  };
  </script>