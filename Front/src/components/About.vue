<template>
    <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 sm:p-12">
        
        <!-- Header Section -->
        <div class="text-center mb-12">
          <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">About Us</h1>
          <p class="mt-4 text-lg text-gray-600">
            Building reliable, secure, and modern web applications tailored for high performance.
          </p>
        </div>
  
        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p class="text-gray-600 leading-relaxed mb-4">
              We strive to bridge the gap between complex digital architectures and seamless user experiences. 
              By leveraging modern stacks like Vue 3, Express, and secure databases, we deliver robust digital products 
              that scale efficiently.
            </p>
            <p class="text-gray-600 leading-relaxed">
              Every component we build prioritizes data security, code maintainability, and clean responsive design.
            </p>
          </div>
          <div class="bg-gray-100 p-6 rounded-lg border border-gray-200">
            <h3 class="text-xl font-semibold text-gray-800 mb-3">Core Values</h3>
            <ul class="space-y-3 text-gray-600">
              <li class="flex items-center">
                <span class="h-2 w-2 bg-indigo-600 rounded-full mr-3"></span>
                Security-First Architecture
              </li>
              <li class="flex items-center">
                <span class="h-2 w-2 bg-indigo-600 rounded-full mr-3"></span>
                Clean & Scalable Codebase
              </li>
              <li class="flex items-center">
                <span class="h-2 w-2 bg-indigo-600 rounded-full mr-3"></span>
                Seamless User Experience
              </li>
            </ul>
          </div>
        </div>
  
        <!-- Call to Action Footer -->
        <div class="border-t border-gray-200 pt-8 text-center">
          <p class="text-gray-600 mb-4">Have questions or want to collaborate on a project?</p>
          <router-link 
            to="/" 
            class="inline-block bg-indigo-600 text-white font-medium px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition duration-200"
          >
            Back to Storefront
          </router-link>
        </div>
  
      </div>
    </div>
  </template>
  
  <script setup>
  // Component logic if needed
  </script>