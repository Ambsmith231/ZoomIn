<template>

<div>

<UserNavbar v-if="isLoggedIn" />

<Navbar v-else />
</div>
    <section

    
      v-if="!loading && product"
      class="max-w-7xl mx-auto px-6 md:px-16 py-12"
    >
      <div class="grid md:grid-cols-2 gap-12">
  
        <!-- Product Image -->
        <div class="bg-[#f9f9f9] rounded-sm p-8 flex items-center justify-center">
          <img
            :src="`http://localhost:5000${product.imageUrl}`"
            :alt="product.title"
            class="max-h-[500px] object-contain"
          />
        </div>
  
        <!-- Product Info -->
        <div>
  
          <p class="text-xs uppercase tracking-widest text-gray-400 font-bold">
            {{ product.category }}
          </p>
  
          <h1 class="text-4xl font-black text-gray-900 mt-2">
            {{ product.title }}
          </h1>
  
          <p class="text-3xl font-extrabold text-[#ef4444] mt-4">
            ${{ Number(product.price).toFixed(2) }}
          </p>
  
          <div class="mt-6">
            <h3 class="font-bold mb-2">
              Description
            </h3>
  
            <p class="text-gray-600 leading-7">
              {{ product.description }}
            </p>
          </div>
  
          <div class="mt-6 space-y-2 text-sm">
  
            <p>
              <strong>Category:</strong>
              {{ product.category }}
            </p>
  
            <p>
              <strong>Quantity:</strong>
              {{ product.quantity }}
            </p>
  
            <p>
              <strong>Status:</strong>
  
              <span
                :class="product.isAvailable ? 'text-green-600' : 'text-red-600'"
              >
                {{ product.isAvailable ? "Available" : "Sold Out" }}
              </span>
            </p>
  
          </div>
  
          <button
            class="mt-8 w-full bg-[#ef4444] hover:bg-red-600 text-white py-4 font-black uppercase tracking-widest rounded-sm"
            @click="placeOrder"
            :disabled="!product.isAvailable"
          >
            Buy NOW
          </button>
  
        </div>
  
      </div>
    </section>
  
    <div v-else class="text-center py-20">
      Loading Product...
    </div>
  </template>
  
  <script>
import { api, auth } from "../api";
import Navbar from "../components/Navbar.vue";
import UserNavbar from "../components/UserNavbar.vue";
export default {

  components: {
    Navbar,
    UserNavbar,
  },

  computed: {
    isLoggedIn() {
      return auth.isLoggedIn();
    }
  },


  data() {
    return {
      product: null,
      loading: true
    };
  },


  async mounted() {
    await this.loadProduct();
  },


  methods: {

    async loadProduct() {

      try {

        const data = await api.getProduct(this.$route.params.id);

        this.product = data.product || data;

      } catch (err) {

        console.error("Failed to load product:", err);

      } finally {

        this.loading = false;

      }

    },


    placeOrder() {

      // Check if product exists
      if (!this.product) {
        alert("Product information not loaded.");
        return;
      }


      // Check availability
      if (!this.product.isAvailable) {

        alert("This product is currently sold out.");

        return;

      }


      // Check login
      if (!auth.isLoggedIn()) {

        alert("Please login before placing an order.");

        this.$router.push("/login");

        return;

      }


      const user = auth.getUser();


      // Prevent admin from buying
      if (user && user.role === "admin") {

        alert("Administrator accounts cannot purchase products.");

        return;

      }


      // Go to checkout
      this.$router.push(`/checkout/${this.product.id}`);

    }

  }

};

</script>