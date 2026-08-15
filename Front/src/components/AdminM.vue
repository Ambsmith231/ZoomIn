<!-- src/components/admin/AdminView.vue -->
<template>
    <div class="min-h-screen bg-[#f4f4f4] pb-20 font-sans selection:bg-red-500 selection:text-white">
      
      <!-- 1. Header with "+ Post New Goods" Button -->
      <AdminNavbar 
        :total-count="products.length" 
        @open-post-modal="isPostModalOpen = true"
        @exit="$emit('exit-admin')" 
      />
  
      <!-- Main Content Area -->
      <main class="max-w-7xl mx-auto px-6 md:px-16 mt-10">
        
        <!-- Loading Indicator -->
        <div v-if="loading" class="text-center py-12 text-xs font-bold text-gray-500">
          <i class="fas fa-circle-notch fa-spin text-red-500 text-xl mb-2 block"></i>
          Syncing inventory with SQLite server...
        </div>
  
        <!-- 2. Live Inventory List & Deletion Table -->
        <AdminInventoryList 
          v-else
          :products="products" 
          @delete-product="handleDelete" 
        />
  
      </main>
  
      <!-- 3. Post Goods Modal Overlay (Renders conditionally) -->
      <AdminPostGoods 
        v-if="isPostModalOpen" 
        @close="isPostModalOpen = false"
        @product-created="handleProductAdded" 
      />
  
    </div>
  </template>
  
  <script>
  import AdminNavbar from './AdminNavbar.vue';
  import AdminInventoryList from './AdminInventoey.vue';
  import AdminPostGoods from './AdminPost.vue';
  import { api } from '../api.js';
  
  export default {
    name: 'AdminView',
    components: {
      AdminNavbar,
      AdminInventoryList,
      AdminPostGoods
    },
    data() {
      return {
        isPostModalOpen: false,
        loading: true,
        products: []
      };
    },
    async mounted() {
      await this.loadInventory();
    },
    methods: {
      async loadInventory() {
        this.loading = true;
        try {
          const data = await api.getProducts();
          this.products = data || [];
        } catch (err) {
          console.error("Failed loading backend products:", err);
        } finally {
          this.loading = false;
        }
      },
  
      // Triggered when AdminPostGoods successfully saves an item to SQLite
      handleProductAdded(newProduct) {
        // Instantly add to top of UI list so admin sees it immediately
        this.products.unshift(newProduct);
      },
  
      // Triggered when Admin clicks "Delete" after a client buys the item
      async handleDelete(product) {
        const confirmed = confirm(`Delete "${product.title}"? This permanently removes the goods from the live storefront catalog.`);
        if (!confirmed) return;
  
        try {
          await api.deleteProduct(product.id);
          // Remove instantly from frontend array
          this.products = this.products.filter(p => p.id !== product.id);
        } catch (err) {
          console.error("Deletion error:", err);
          // Fallback UI removal if API is offline/mocked
          this.products = this.products.filter(p => p.id !== product.id);
        }
      }
    }
  };
  </script>