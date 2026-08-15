<!-- src/components/Footer.vue -->
<template>
    <footer class="bg-[#121318] text-white pt-16 pb-12 px-6 md:px-16 border-t border-gray-800">
      <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
        
        <!-- Column 1: Brand & Bio -->
        <div class="space-y-4">
          <a href="#" class="text-2xl font-black tracking-tight text-white flex items-center">
            <span class="inline-block border-2 border-white rounded px-1 mr-1 text-xl font-bold">E</span>
            Buy
          </a>
          <p class="text-[11px] text-gray-400 leading-relaxed font-medium max-w-xs">
            EBuy is your one-stop online shop for the latest fashion, electronics, and lifestyle products. We are committed to providing quality products and exceptional customer service.
          </p>
          <div class="flex items-center space-x-3 text-gray-400 text-sm pt-1">
            <a href="#" class="hover:text-red-500 transition"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="hover:text-red-500 transition"><i class="fab fa-twitter"></i></a>
            <a href="#" class="hover:text-red-500 transition"><i class="fab fa-instagram"></i></a>
            <a href="#" class="hover:text-red-500 transition"><i class="fab fa-whatsapp"></i></a>
          </div>
        </div>
  
        <!-- Column 2: Quick Links -->
        <div class="space-y-3">
          <h4 class="font-extrabold text-xs tracking-widest uppercase text-white">Quick Links</h4>
          <ul class="space-y-2 text-[11px] font-semibold text-gray-400">
            <li><a href="#" class="hover:text-red-500 transition">Home</a></li>
            <li><a href="products" class="hover:text-red-500 transition">New Arrivals</a></li>
            <li><a href="#" class="hover:text-red-500 transition">Services & Support</a></li>
            <li><a href="#" class="hover:text-red-500 transition">About Our Store</a></li>
            <li><a href="#" class="hover:text-red-500 transition">Latest News</a></li>
          </ul>
        </div>
  
        <!-- Column 3: Customer Care -->
        <div class="space-y-3">
          <h4 class="font-extrabold text-xs tracking-widest uppercase text-white">Customer Care</h4>
          <ul class="space-y-2 text-[11px] font-semibold text-gray-400">
            <li><a href="#" class="hover:text-red-500 transition">Mobile Money FAQ</a></li>
            <li><a href="#" class="hover:text-red-500 transition">Order Tracking</a></li>
            <li><a href="#" class="hover:text-red-500 transition">3 Days Return Policy</a></li>
            <li><a href="#" class="hover:text-red-500 transition">Shipping & Delivery</a></li>
            <li><a href="#" class="hover:text-red-500 transition">Contact Support</a></li>
          </ul>
        </div>
  
        <!-- Column 4: Newsletter -->
        <div class="space-y-3">
          <h4 class="font-extrabold text-xs tracking-widest uppercase text-white">Newsletter</h4>
          <p class="text-[11px] text-gray-400 font-medium leading-relaxed">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <form @submit.prevent="subscribeNewsletter" class="flex flex-col space-y-2 pt-1">
            <input 
              type="email" 
              v-model="email"
              placeholder="Enter your email address" 
              required
              class="bg-gray-900 border border-gray-700 px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition rounded-sm"
            />
            <button 
              type="submit" 
              class="bg-[#ef4444] hover:bg-red-600 text-white font-extrabold text-[11px] uppercase py-2.5 tracking-widest transition rounded-sm shadow-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
  
      </div>
  
      <!-- Bottom Copyright & Payment Methods -->
      <div class="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-500 font-medium gap-4">
        <p>&copy; {{ new Date().getFullYear() }} EBuy Store. All rights reserved.</p>
        
        <!-- Payment Badges -->
        <div class="flex items-center space-x-3">
          <span class="text-xs uppercase tracking-wider text-gray-400 font-bold mr-1">We Accept:</span>
          <span class="bg-gray-800 text-amber-400 font-bold px-2 py-1 rounded text-[10px] tracking-wider border border-gray-700">
            MTN MoMo
          </span>
          <span class="bg-gray-800 text-orange-400 font-bold px-2 py-1 rounded text-[10px] tracking-wider border border-gray-700">
            Orange Money
          </span>
          <span class="bg-gray-800 text-blue-400 font-bold px-2 py-1 rounded text-[10px] tracking-wider border border-gray-700">
            <i class="far fa-credit-card"></i> Cards
          </span>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer',
    data() {
      return {
        email: ''
      };
    },
    methods: {
      subscribeNewsletter() {
        if (this.email) {
          alert(`Thank you for subscribing with ${this.email}!`);
          this.email = '';
        }
      }
    }
  };
  </script>