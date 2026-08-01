<template>
    <section class="min-h-screen bg-gray-100 py-10 px-5">
  
      <div class="max-w-7xl mx-auto">
  
        <!-- Header -->
        <div class="mb-8">
          <button
            @click="$router.back()"
            class="text-red-500 font-bold hover:text-red-600"
          >
            ← Back
          </button>
  
          <h1 class="text-4xl font-black text-gray-900 mt-3">
            Secure Checkout
          </h1>
  
          <p class="text-gray-500 mt-2">
            Review your order before placing it.
          </p>
        </div>
  
        <div
          v-if="loading"
          class="text-center py-20 font-bold text-gray-500"
        >
          Loading...
        </div>
  
        <div
          v-else
          class="grid lg:grid-cols-3 gap-8"
        >
  
          <!-- LEFT -->
          <div class="lg:col-span-2 space-y-6">
  
            <!-- Product -->
            <div class="bg-white rounded shadow p-6">
  
              <h2 class="font-black text-xl mb-5">
                Product Information
              </h2>
  
              <div class="flex gap-6">
  
                <img
                  :src="`http://localhost:5000${product.imageUrl}`"
                  class="w-40 h-40 object-cover rounded border"
                />
  
                <div class="flex-1">
  
                  <h3 class="text-2xl font-bold">
                    {{ product.title }}
                  </h3>
  
                  <p class="text-gray-500 mt-2">
                    {{ product.description }}
                  </p>
  
                  <div class="mt-4 space-y-2">
  
                    <p>
                      <strong>Category:</strong>
                      {{ product.category }}
                    </p>
  
                    <p>
                      <strong>Price:</strong>
                      ${{ Number(product.price).toFixed(2) }}
                    </p>
  
                    <p>
                      <strong>Available:</strong>
  
                      <span
                        class="text-green-600 font-bold"
                        v-if="product.isAvailable"
                      >
                        In Stock
                      </span>
  
                      <span
                        v-else
                        class="text-red-600 font-bold"
                      >
                        Sold Out
                      </span>
  
                    </p>
  
                  </div>
  
                </div>
  
              </div>
  
            </div>
  
            <!-- Customer -->
            <div class="bg-white rounded shadow p-6">
  
              <h2 class="font-black text-xl mb-5">
                Customer Information
              </h2>
  
              <div class="grid md:grid-cols-2 gap-4">
  
                <input
                  v-model="order.customerName"
                  placeholder="Full Name"
                  class="border rounded px-4 py-3"
                />
  
                <input
                  v-model="order.email"
                  placeholder="Email"
                  class="border rounded px-4 py-3"
                />
  
                <input
                  v-model="order.phone"
                  placeholder="Phone Number"
                  class="border rounded px-4 py-3"
                />
  
                <input
                  v-model="order.address"
                  placeholder="Delivery Address"
                  class="border rounded px-4 py-3"
                />
  
              </div>
  
            </div>
  
            <!-- Payment -->
            <div class="bg-white rounded shadow p-6">
  
              <h2 class="font-black text-xl mb-5">
                Payment Method
              </h2>
  
              <div class="space-y-3">
  
                <label class="flex gap-3">
  
                  <input
                    type="radio"
                    value="momo"
                    v-model="order.paymentMethod"
                  >
  
                  Mobile Money
  
                </label>
  
                <label class="flex gap-3">
  
                  <input
                    type="radio"
                    value="bank"
                    v-model="order.paymentMethod"
                  >
  
                  Bank Transfer
  
                </label>
  
              </div>
  
              <div
                v-if="order.paymentMethod==='momo'"
                class="mt-6 space-y-4"
              >
  
                <select
                  v-model="order.network"
                  class="border rounded px-4 py-3 w-full"
                >
                  <option value="">
                    Select Network
                  </option>
  
                  <option>
                    Orange Money
                  </option>
  
                  <option>
                    MTN Mobile Money
                  </option>
  
                </select>
  
                <input
                  v-model="order.momoNumber"
                  placeholder="Mobile Money Number"
                  class="border rounded px-4 py-3 w-full"
                />
  
              </div>
  
              <div
                v-if="order.paymentMethod==='bank'"
                class="mt-6 bg-gray-100 p-4 rounded"
              >
  
                <p class="font-bold">
                  Bank Name:
                </p>
  
                <p>Your Bank</p>
  
                <p class="mt-2 font-bold">
                  Account Number:
                </p>
  
                <p>XXXXXXXXXXXX</p>
  
                <p class="mt-2 font-bold">
                  Account Name:
                </p>
  
                <p>Your Business Name</p>
  
              </div>
  
            </div>
  
          </div>
  
          <!-- RIGHT -->
          <div>
  
            <div class="bg-white rounded shadow p-6 sticky top-6">
  
              <h2 class="font-black text-xl mb-6">
                Order Summary
              </h2>
  
              <div class="flex justify-between mb-3">
  
                <span>Price</span>
  
                <strong>
                  ${{ Number(product.price).toFixed(2) }}
                </strong>
  
              </div>
  
              <div class="flex justify-between mb-4">
  
                <span>Quantity</span>
  
                <input
                  type="number"
                  min="1"
                  v-model.number="order.quantity"
                  class="border rounded w-20 text-center"
                >
  
              </div>
  
              <div class="border-t pt-4 flex justify-between text-xl font-black">
  
                <span>Total</span>
  
                <span>
                  ${{ total }}
                </span>
  
              </div>
  
              <button
                @click="placeOrder"
                class="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded font-black mt-8 transition"
              >
                PLACE ORDER
              </button>
  
            </div>
  
          </div>
  
        </div>
  
      </div>
  
    </section>
  </template>
  
  <script>
  import { api, auth } from "../api";
  
  export default {
  
    data() {
  
      return {
  
        loading: true,
  
        product: {},
  
        order: {
  
          customerName: "",
          email: "",
          phone: "",
          address: "",
  
          quantity: 1,
  
          paymentMethod: "momo",
  
          network: "",
  
          momoNumber: ""
  
        }
  
      };
  
    },
  
    computed: {
  
      total() {
  
        return (
          Number(this.product.price || 0) *
          this.order.quantity
        ).toFixed(2);
  
      }
  
    },
  
    async mounted() {
  
      const id = this.$route.params.id;
  
      const user = auth.getUser();
  
      if (user) {
  
        this.order.customerName = user.name || "";
        this.order.email = user.email || "";
        this.order.phone = user.phone || "";
  
      }
  
      try {
  
        this.product = await api.getProduct(id);
  
      } catch (err) {
  
        alert("Unable to load product.");
  
      } finally {
  
        this.loading = false;
  
      }
  
    },
  
    methods: {
  
      async placeOrder() {
  
        if (!auth.isLoggedIn()) {
  
          this.$router.push("/login");
  
          return;
  
        }
  
        try {
  
          await api.createOrder({
  
            productId: this.product.id,
  
            quantity: this.order.quantity,
  
            customerName: this.order.customerName,
  
            email: this.order.email,
  
            phone: this.order.phone,
  
            address: this.order.address,
  
            paymentMethod: this.order.paymentMethod,
  
            network: this.order.network,
  
            momoNumber: this.order.momoNumber
  
          });
  
          alert("Order placed successfully!");
  
          this.$router.push("/orders");
  
        } catch (err) {
  
          alert(err.message);
  
        }
  
      }
  
    }
  
  };
  </script>