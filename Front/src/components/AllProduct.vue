<template>
  <div class="min-h-screen bg-gray-100">

    <main class="max-w-7xl mx-auto px-6 py-10">

      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-5 mb-10">

        <div>
          <span class="text-xs uppercase tracking-widest text-red-500 font-bold">
            Shopping
          </span>

          <h1 class="text-4xl font-black text-gray-900 mt-1">
            All Products
          </h1>

          <p class="text-gray-500 mt-2">
            Browse the latest products available in our store.
          </p>
        </div>

        <!-- Search -->
        <div class="relative w-full md:w-80">

          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            class="w-full border border-gray-300 rounded px-4 py-3 bg-white focus:outline-none focus:border-red-500"
          />

          <svg
            class="absolute right-4 top-4 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

        </div>

      </div>

      <!-- Categories -->

      <div class="flex flex-wrap gap-3 mb-10">

        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          class="px-5 py-2 text-sm font-semibold rounded transition"
          :class="
            selectedCategory === cat
              ? 'bg-red-500 text-white'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
          "
        >
          {{ cat }}
        </button>

      </div>

      <!-- Loading -->

      <div
        v-if="loading"
        class="py-24 text-center text-gray-500 font-semibold"
      >
        Loading products...
      </div>

      <!-- Products -->

      <div
        v-else-if="filteredProducts.length"
        class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >

        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white rounded shadow hover:shadow-lg transition overflow-hidden border border-gray-200"
        >

          <!-- Image -->

          <img
            :src="`http://localhost:5000${product.imageUrl}`"
            :alt="product.title"
            class="w-full h-72 object-cover"
          >

          <!-- Body -->

          <div class="p-5">

            <span
              class="inline-block bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded"
            >
              {{ product.category }}
            </span>

            <h2
              class="text-xl font-bold text-gray-900 mt-3 line-clamp-1"
            >
              {{ product.title }}
            </h2>

            <p
              class="text-gray-500 text-sm mt-2 line-clamp-2"
            >
              {{ product.description }}
            </p>

            <div
              class="flex justify-between items-center mt-5"
            >

              <span
                class="text-2xl font-black text-gray-900"
              >
                ${{ Number(product.price).toFixed(2) }}
              </span>

              <span
                v-if="product.isAvailable"
                class="text-green-600 text-sm font-bold"
              >
                In Stock
              </span>

              <span
                v-else
                class="text-red-500 text-sm font-bold"
              >
                Sold Out
              </span>

            </div>

            <button
              @click="viewDetails(product.id)"
              class="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded font-bold transition"
            >
              View Details
            </button>

          </div>

        </div>

      </div>

      <!-- Empty -->

      <div
        v-else
        class="text-center py-24"
      >

        <h2 class="text-2xl font-bold text-gray-800">
          No Products Found
        </h2>

        <p class="text-gray-500 mt-3">
          Try another search or category.
        </p>

      </div>

    </main>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { api } from "../api";

const router = useRouter();

const loading = ref(true);
const products = ref([]);

const searchQuery = ref("");
const selectedCategory = ref("All");

const categories = [
  "All",
  "Outerwear",
  "Footwear",
  "Accessories",
  "Basics",
];

// Load Products
const fetchProducts = async () => {
  loading.value = true;

  try {
    const response = await api.getProducts();

    // Supports:
    // response.products
    // or response directly
    products.value = response.products || response;

  } catch (error) {
    console.error("Failed to load products:", error);

    products.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});

// Filter Products
const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const title = product.title || "";
    const category = product.category || "";

    const matchesSearch = title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());

    const matchesCategory =
      selectedCategory.value === "All" ||
      category === selectedCategory.value;

    return matchesSearch && matchesCategory;
  });
});

// Open Product Details
const viewDetails = (id) => {
  router.push(`/user/products/${id}`);
};
</script>