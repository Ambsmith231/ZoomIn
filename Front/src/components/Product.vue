<!-- src/components/ProductGrid.vue -->
<template>
  <section id="produc" class="py-16 px-6 md:px-16 max-w-7xl mx-auto">

    <!-- Section Header -->
    <div class="flex justify-between items-end mb-10">
      <div>
        <span class="text-xs text-gray-400 font-medium tracking-wider uppercase">
          Check out latest products
        </span>
        <h2 class="text-2xl md:text-3xl font-black tracking-tight text-gray-900 mt-1">
          New Arrivals
        </h2>
      </div>

      <button
        class="border border-gray-300 text-xs font-bold px-5 py-2.5 hover:bg-black hover:text-white hover:border-black transition uppercase tracking-wider"
      >
        View All
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-12">
      <p class="text-sm text-gray-500 font-semibold">
        Loading latest products...
      </p>
    </div>

    <!-- Error -->
    <div
      v-else-if="error"
      class="bg-red-50 text-red-600 p-4 rounded text-xs text-center font-semibold"
    >
      {{ error }}
    </div>

    <!-- Products -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
    >

      <div
        v-for="product in products"
        :key="product.id"
        class="group flex flex-col justify-between"
      >

        <!-- Image -->
        <div>

          <div
            class="bg-[#f9f9f9] p-6 relative flex justify-center items-center h-64 overflow-hidden rounded-sm"
          >

            <span
              v-if="product.oldPrice"
              class="absolute top-3 left-3 bg-[#ef4444] text-white text-[10px] font-extrabold px-2 py-0.5 uppercase tracking-wider"
            >
              Sale!
            </span>

            <img
              :src="`http://localhost:5000${product.imageUrl}`"
              :alt="product.title"
              class="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
            />

          </div>

          <!-- Details -->
          <div class="mt-4 space-y-1.5">

            <div class="text-amber-400 text-[11px] flex space-x-0.5">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>

            <h3
              class="font-bold text-xs text-gray-800 tracking-wide truncate"
            >
              {{ product.title }}
            </h3>

            <div class="flex items-center space-x-2 text-xs font-extrabold">
              <span class="text-gray-900">
                ${{ Number(product.price).toFixed(2) }}
              </span>

              <span
                v-if="product.oldPrice"
                class="text-gray-400 line-through font-normal"
              >
                ${{ Number(product.oldPrice).toFixed(2) }}
              </span>
            </div>

          </div>

        </div>

        <!-- Buttons -->
        <div class="grid grid-cols-2 gap-2 pt-4">

          <!-- View Details -->
          <button
            @click="viewProduct(product.id)"
            class="border border-gray-300 hover:border-black hover:bg-black hover:text-white text-gray-800 text-[11px] font-extrabold py-2.5 uppercase tracking-widest transition rounded-sm"
          >
            View Details
          </button>

        </div>

      </div>

    </div>

  </section>
</template>

<script>
import { api } from "../api";

export default {
  name: "ProductGrid",

  data() {
    return {
      products: [],
      loading: true,
      error: null
    };
  },

  async mounted() {
    await this.fetchProducts();
  },

  methods: {

    async fetchProducts() {

      this.loading = true;

      try {

        const data = await api.getProducts();

        this.products = data.products || data;

      } catch (err) {

        console.error(err);

        this.error = "Unable to load products.";

      } finally {

        this.loading = false;

      }

    },


    // Anyone can view product details
    viewProduct(id) {

      this.$router.push(`/products/${id}`);

    }

  }
};
</script>