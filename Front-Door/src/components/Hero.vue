<!-- src/components/HeroSection.vue -->
<template>
    <section class="bg-[#f4f4f4] py-12 md:py-20 px-6 md:px-16">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <!-- Left Column: Copy, Search & Highlights -->
        <div class="space-y-6">
          <h1 class="text-4xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight">
            Brand New<br />Collection
          </h1>
  
          <p class="text-gray-500 text-xs md:text-sm leading-relaxed max-w-md">
            stop playing this Ebuy store just make the oder and we do the delivery for free right your door sept
        </p>
  
          <!-- Bullet Highlights -->
          <div class="flex flex-wrap items-center gap-6 text-xs font-bold text-gray-800">
            <span class="flex items-center gap-2">
              <i class="fas fa-check text-black text-xs"></i> Top Brands
            </span>
            <span class="flex items-center gap-2">
              <i class="fas fa-check text-black text-xs"></i> High Quality
            </span>
            <span class="flex items-center gap-2">
              <i class="fas fa-check text-black text-xs"></i> Free Delivery
            </span>
          </div>
  
          <!--  Search Bard -->
          <form @submit.prevent="executeSearch" class="pt-2 max-w-md">
            <div class="relative flex items-center shadow-sm">
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Search electronics, clothes, brands..." 
                class="w-full bg-white border border-gray-300 rounded-sm px-4 py-3.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black transition pr-28"
              />
              <button 
                type="submit" 
                class="absolute right-1 bg-[#ef4444] hover:bg-red-600 text-white font-extrabold text-[11px] uppercase px-5 py-2.5 tracking-wider transition rounded-sm flex items-center gap-1.5"
              >
                <i class="fas fa-search"></i>
                <span>Search</span>
              </button>
            </div>
            <!-- Quick link to clear search or browse all -->
            <div class="mt-2 flex justify-between items-center text-[11px] text-gray-500">
              <span>Try: <button type="button" @click="quickSearch('shirt')" class="underline hover:text-black">shirts</button>, <button type="button" @click="quickSearch('shoes')" class="underline hover:text-black">shoes</button></span>
              <a href="#products" @click="quickSearch('')" class="font-bold hover:underline text-gray-800">View All Catalog &rarr;</a>
            </div>
          </form>
  
        </div>
  
        <!-- Right Column: Banner Image -->
        <div class="flex justify-center md:justify-end">
          <div class="relative max-w-md w-full">
            <img 
              src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80" 
              alt="Brand New Collection" 
              class="w-full h-auto object-cover rounded-sm shadow-sm"
            />
          </div>
        </div>
  
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'HeroSection',
    data() {
      return {
        searchQuery: ''
      };
    },
    methods: {
      executeSearch() {
        // 1. Emit the search term to App.vue
        this.$emit('search', this.searchQuery);
  
        // 2. Smoothly scroll down to the product catalog
        const productSection = document.getElementById('products');
        if (productSection) {
          productSection.scrollIntoView({ behavior: 'smooth' });
        }
      },
      quickSearch(term) {
        this.searchQuery = term;
        this.executeSearch();
      }
    }
  };
  </script>