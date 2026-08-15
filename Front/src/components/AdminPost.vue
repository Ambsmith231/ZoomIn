<!-- src/components/admin/AdminPostPage.vue -->
<template>
    <div class="max-w-3xl mx-auto px-6 py-10">
      
      <!-- Page Header -->
      <div class="mb-8 flex justify-between items-end">
        <div>
          <span class="text-[10px] text-gray-400 font-extrabold tracking-widest uppercase block">
            Database Entry
          </span>
          <h2 class="text-2xl font-black text-gray-900 tracking-tight mt-1">
            Post New Goods with Image File
          </h2>
        </div>
        <button 
          @click="$emit('navigate', 'inventory')" 
          class="text-xs font-bold text-gray-500 hover:text-black underline uppercase tracking-wider"
        >
           Back to Inventory
        </button>
      </div>
  
      <!-- Form Container -->
      <div class="bg-white p-8 rounded-sm shadow-sm border border-gray-200">
        <form @submit.prevent="submitGoods" class="space-y-6">
          
          <!-- Title Input -->
          <div>
            <label class="block text-[11px] font-extrabold uppercase tracking-wider text-gray-700 mb-1.5">
              Product Title
            </label>
            <input 
              type="text" 
              v-model="form.title" 
              placeholder="e.g., Heavyweight Knit Sweater" 
              required
              class="w-full bg-[#f9f9f9] border border-gray-300 rounded-sm px-4 py-3 text-xs text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-black transition"
            />
          </div>

          <!-- Description Textarea -->
          <div>
            <label class="block text-[11px] font-extrabold uppercase tracking-wider text-gray-700 mb-1.5">
              Product Description
            </label>
            <textarea 
              v-model="form.description" 
              rows="3"
              placeholder="Enter detailed fabric, fit, or style specifications..." 
              class="w-full bg-[#f9f9f9] border border-gray-300 rounded-sm px-4 py-3 text-xs text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-black transition resize-none"
            ></textarea>
          </div>
  
          <!-- Category & Availability Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-[11px] font-extrabold uppercase tracking-wider text-gray-700 mb-1.5">
                Category
              </label>
              <select 
                v-model="form.category" 
                class="w-full bg-[#f9f9f9] border border-gray-300 rounded-sm px-3.5 py-3 text-xs text-gray-800 focus:bg-white focus:outline-none focus:border-black transition"
              >
                <option value="Clothing">Clothing</option>
                <option value="Shoes">Shoes</option>
                <option value="Accessories">Accessories</option>
                <option value="Electronics">Electronics</option>
              </select>
            </div>
  
            <div class="flex items-center pt-6">
              <label class="flex items-center space-x-2.5 text-xs font-bold text-gray-800 cursor-pointer">
                <input 
                  type="checkbox" 
                  v-model="form.isAvailable" 
                  class="rounded border-gray-300 text-[#ef4444] focus:ring-0 w-4 h-4" 
                />
                <span>Available for MoMo Pay</span>
              </label>
            </div>
          </div>
  
          <!-- Pricing Input (Single field) -->
          <div>
            <label class="block text-[11px] font-extrabold uppercase tracking-wider text-gray-700 mb-1.5">
              Selling Price ($)
            </label>
            <input 
              type="number" 
              step="0.01" 
              v-model="form.price" 
              placeholder="45.00" 
              required
              class="w-full bg-[#f9f9f9] border border-gray-300 rounded-sm px-4 py-3 text-xs text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-black transition font-bold"
            />
          </div>
  
          <!-- Image File Upload Input & Local Preview -->
          <div>
            <label class="block text-[11px] font-extrabold uppercase tracking-wider text-gray-700 mb-1.5">
              Upload Product Image File
            </label>
            <input 
              type="file" 
              @change="handleFileUpload" 
              accept="image/*"
              required
              class="w-full bg-[#f9f9f9] border border-gray-300 rounded-sm px-3 py-2 text-xs text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-extrabold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
            />
            
            <!-- Local Image Preview Box -->
            <div v-if="imagePreviewUrl" class="mt-3 p-2 bg-[#f9f9f9] border border-gray-200 rounded-sm inline-flex items-center gap-3">
              <img :src="imagePreviewUrl" alt="Local Preview" class="h-12 w-12 object-cover rounded-sm bg-white border border-gray-200" />
              <span class="text-[11px] text-gray-500 font-medium">Image selected: {{ selectedFileName }}</span>
            </div>
          </div>
  
          <!-- Submit Buttons -->
          <div class="pt-6 border-t border-gray-100 flex items-center justify-end space-x-4">
            <button 
              type="button" 
              @click="$emit('navigate', 'inventory')" 
              class="px-6 py-3 border border-gray-300 hover:border-black text-gray-700 hover:text-black font-extrabold text-xs uppercase tracking-wider transition rounded-sm"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              :disabled="submitting"
              class="bg-[#ef4444] hover:bg-red-600 disabled:bg-gray-300 text-white font-extrabold text-xs uppercase px-8 py-3.5 tracking-widest transition rounded-sm shadow-sm flex items-center gap-2"
            >
              <i v-if="submitting" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-upload"></i>
              <span>{{ submitting ? 'Uploading & Saving...' : 'Upload & Publish' }}</span>
            </button>
          </div>
  
        </form>
      </div>
  
    </div>
  </template>
  
  <script>
  import { api } from '../api';
  
  export default {
    name: 'AdminPostPage',
    data() {
      return {
        submitting: false,
        imageFile: null,
        imagePreviewUrl: null,
        selectedFileName: '',
        form: {
          title: '',
          description: '',
          category: 'Clothing',
          price: '',
          isAvailable: true
        }
      };
    },
    methods: {
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
          this.imageFile = file;
          this.selectedFileName = file.name;
          this.imagePreviewUrl = URL.createObjectURL(file);
        }
      },
      async submitGoods() {
        if (!this.imageFile) {
          alert('Please select an image file to upload.');
          return;
        }
  
        this.submitting = true;
        try {
          const formData = new FormData();
          formData.append('title', this.form.title.trim());
          formData.append('description', this.form.description.trim());
          formData.append('category', this.form.category);
          formData.append('price', this.form.price);
          formData.append('isAvailable', this.form.isAvailable);
          formData.append('image', this.imageFile);
  
          const createdProduct = await api.createProduct(formData);
  
          this.$emit('product-created', createdProduct || { 
            ...this.form, 
            id: Date.now(), 
            imageUrl: this.imagePreviewUrl 
          });
          this.$emit('navigate', 'inventory');
        } catch (err) {
          alert(`Failed to upload Good: ${err.message || 'Check server connection.'}`);
        } finally {
          this.submitting = false;
        }
      }
    }
  };
  </script>