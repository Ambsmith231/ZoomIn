<!-- src/components/ValueProps.vue -->
<template>
    <section class="bg-[#121318] text-white py-14 px-6 md:px-16 border-t border-gray-800">
      <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        
        <!-- 1. Secure Payment -->
        <div class="space-y-2 group hover:-translate-y-1 transition duration-300">
          <div class="text-2xl text-gray-300 mb-3 group-hover:text-red-500 transition-colors">
            <i class="far fa-credit-card"></i>
          </div>
          <h4 class="font-extrabold text-xs tracking-wider uppercase">Secure Payment</h4>
          <p class="text-[11px] text-gray-400 font-medium">100% secure payment</p>
        </div>
  
        <!--  3 Days Return -->
        <div class="space-y-2 group hover:-translate-y-1 transition duration-300">
          <div class="text-2xl text-gray-300 mb-3 group-hover:text-red-500 transition-colors">
            <i class="fas fa-undo text-xl"></i>
          </div>
          <h4 class="font-extrabold text-xs tracking-wider uppercase">3 Days Return</h4>
          <p class="text-[11px] text-gray-400 font-medium">If goods have problems</p>
        </div>
  
        <!--  24/7 Support -->
        <div class="space-y-2 group hover:-translate-y-1 transition duration-300">
          <div class="text-2xl text-gray-300 mb-3 group-hover:text-red-500 transition-colors">
            <i class="fas fa-headset"></i>
          </div>
          <h4 class="font-extrabold text-xs tracking-wider uppercase">24/7 Support</h4>
          <p class="text-[11px] text-gray-400 font-medium">Dedicated support</p>
        </div>
  
        <!--  Free Delivery -->
        <div class="space-y-2 group hover:-translate-y-1 transition duration-300">
          <div class="text-2xl text-gray-300 mb-3 group-hover:text-red-500 transition-colors">
            <i class="fas fa-shipping-fast"></i>
          </div>
          <h4 class="font-extrabold text-xs tracking-wider uppercase">Free Delivery</h4>
          <p class="text-[11px] text-gray-400 font-medium">For all orders over $100</p>
        </div>
  
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'ValueProps'
  }
  </script>