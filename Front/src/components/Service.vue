<template>
    <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-5xl mx-auto">
        
        <!-- Header Section -->
        <div class="text-center mb-12">
          <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Our Services</h1>
          <p class="mt-4 text-lg text-gray-600">
            Professional solutions designed to elevate your digital presence and operational workflows.
          </p>
        </div>
  
        <!-- Services Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <!-- Service Card 1 -->
          <div class="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col justify-between hover:shadow-lg transition duration-200">
            <div>
              <div class="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl mb-4">
                01
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Full-Stack Development</h3>
              <p class="text-gray-600 text-sm leading-relaxed">
                Custom web applications built using Vue 3 on the frontend and Express & SQLite/Node on the backend, optimized for fast performance.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-gray-100">
              <span class="text-xs font-semibold uppercase tracking-wider text-indigo-600">Scalable & Responsive</span>
            </div>
          </div>
  
          <!-- Service Card 2 -->
          <div class="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col justify-between hover:shadow-lg transition duration-200">
            <div>
              <div class="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl mb-4">
                02
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Secure API Integration</h3>
              <p class="text-gray-600 text-sm leading-relaxed">
                Implementation of robust authentication frameworks using JWT tokens, secure middleware protection, and multipart file upload handling.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-gray-100">
              <span class="text-xs font-semibold uppercase tracking-wider text-indigo-600">Protected & Authenticated</span>
            </div>
          </div>
  
          <!-- Service Card 3 -->
          <div class="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col justify-between hover:shadow-lg transition duration-200">
            <div>
              <div class="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl mb-4">
                03
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">E-Commerce Dashboards</h3>
              <p class="text-gray-600 text-sm leading-relaxed">
                Management interfaces allowing administrators to securely publish products, manage inventory files, and process digital inventories.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-gray-100">
              <span class="text-xs font-semibold uppercase tracking-wider text-indigo-600">Admin Control</span>
            </div>
          </div>
  
        </div>
  
        <!-- Footer Call to Action -->
        <div class="mt-12 text-center">
          <router-link 
            to="/" 
            class="inline-block bg-indigo-600 text-white font-medium px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition duration-200"
          >
            Explore Products
          </router-link>
        </div>
  
      </div>
    </div>
  </template>
  
  <script setup>
  // Component logic if needed
  </script>