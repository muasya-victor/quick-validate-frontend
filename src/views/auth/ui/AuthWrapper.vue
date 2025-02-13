<!-- <script setup>

import ExternalAuth from "@/views/auth/forms/ExternalAuth.vue"
import { onMounted,ref, watch } from "vue"

const loginImages = ref([
  'Quick.png',
  'etims-Machine-Receipt.png',
  ])

const imageIndex = ref(0)
let timeout
const switchImages = (index = 0, isClickEvent=false)=>{
  clearTimeout(timeout)
  if(isClickEvent){
    imageIndex.value = index
  }else{
    timeout = setTimeout(()=>{
      imageIndex.value = index
    }, 2000)
  }
}

const manualImageSwitch = (imageIndex)>{

}

watch(imageIndex,()=>{
    if(imageIndex.value+1===loginImages.value.length ){
      switchImages(0)
    }else{
      switchImages(imageIndex.value+1)
    }
})

const currentImage = ()=>{
  return loginImages.value[imageIndex.value];
}

onMounted(()=>{
  switchImages(1)
})
</script>

<template>
  <div class="grid md:grid-cols-12 h-screen ">
    <div class="w-full col-span-5 flex flex-col gap-4 h-full hidden md:flex items-center justify-center bg-blue-100">
      <div class="h-2/3 flex items-center justify-center w-full">
        <img alt="agile ui login illustration " :src="'/' + currentImage()" class="w-2/3" >
      </div>

      <div class="flex flex-row gap-2 ">
        <div @click="switchImages(index, true)" :key="i" v-for="(i, index) in loginImages"
             :class="[index===imageIndex? 'bg-blue-500':'bg-gray-200']" class="w-12 rounded-md h-2 cursor-pointer">
        </div>
      </div>

    </div>

    <div class="w-full h-full col-span-7 flex items-center justify-center">
      <div class="w-8/12 flex flex-col gap-4 ">
        <slot></slot>

      </div>

    </div>
  </div>
</template>

<style scoped>

</style>

 -->

 <script setup>
import { ref } from 'vue'

// Logo URLs (you can replace these with your actual logo paths)
const quickbooksLogo = new URL('@/assets/logos/quickbooks.svg', import.meta.url).href
const zohoLogo = new URL('@/assets/logos/zoho.svg', import.meta.url).href

// Animation states for integration cards
const isHoveringQB = ref(false)
const isHoveringZoho = ref(false)

// Function to handle external links
const openExternalLink = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <div class="min-h-screen grid md:grid-cols-12">
    <!-- Left Section - Integration Options -->
    <div class="hidden md:flex md:col-span-7 bg-gradient-to-br from-blue-100 via-blue-50 to-red-500">
      <div class="w-full px-8 py-12 flex flex-col">
        <!-- Top Logo Area -->
        <div class="flex-shrink-0 ">
          <img src="/logo.png" alt="Company Logo" class="h-64 w-auto" />
        </div>

        <!-- Main Content Area -->
        <div class="flex-grow flex flex-col justify-center space-y-12">
          <!-- Welcome Text -->
          <div class="space-y-3">
            <h1 class="text-2xl font-bold text-gray-900">
              Business Integrated Systems
            </h1>
            <p class="text-gray-600">
              Connect your essential business tools
            </p>
          </div>

          <!-- Integration Cards -->
          <div class="grid grid-cols-1 gap-6">
            <!-- QuickBooks Card -->
            <div 
              @mouseenter="isHoveringQB = true"
              @mouseleave="isHoveringQB = false"
              @click="openExternalLink('https://quickbooks.intuit.com')"
              class="group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100"
            >
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 flex-shrink-0">
                  <svg class="w-full h-full" viewBox="0 0 50 50">
                    <path d="M25 2C12.3 2 2 12.3 2 25s10.3 23 23 23 23-10.3 23-23S37.7 2 25 2zm6 33.5h-2.5v-4c-1.4 3.1-4.5 4.7-7.8 4.7-6.1 0-10.2-4.6-10.2-11.2 0-6.5 4.1-11.2 10.2-11.2 3.3 0 6.3 1.5 7.8 4.7v-4h2.5v21z" fill="#2CA01C"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">QuickBooks</h3>
                  <p class="text-sm text-gray-500">Financial Management</p>
                </div>
                <svg 
                  class="w-5 h-5 ml-auto text-gray-400 transform transition-transform duration-300 group-hover:translate-x-1"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            <!-- Zoho Card -->
            <div 
              @mouseenter="isHoveringZoho = true"
              @mouseleave="isHoveringZoho = false"
              @click="openExternalLink('https://www.zoho.com')"
              class="group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100"
            >
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 flex-shrink-0 bg-red-500 rounded-lg flex items-center justify-center">
                  <span class="text-xl font-bold text-white">Z</span>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">Zoho</h3>
                  <p class="text-sm text-gray-500">Business Suite</p>
                </div>
                <svg 
                  class="w-5 h-5 ml-auto text-gray-400 transform transition-transform duration-300 group-hover:translate-x-1"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Area -->
        <div class="flex-shrink-0 mt-auto">
          <div class="flex items-center gap-2 text-sm text-gray-500">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Enterprise-grade security</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Section - Main Content Area -->
    <div class="col-span-12 md:col-span-5 min-h-screen bg-white">
      <div class="w-full h-full flex flex-col">
        <!-- Mobile Header (visible on small screens) -->
        <div class="md:hidden flex items-center justify-between p-4 border-b">
          <img src="/logo.png" alt="Company Logo" class="h-24 w-auto" />
        </div>

        <!-- Main Content -->
        <main class="flex-grow flex items-center justify-center p-6 md:p-12">
          <div class="w-full max-w-md">
            <slot></slot>
          </div>
        </main>

        <!-- Footer Links -->
        <footer class="flex-shrink-0 p-6 text-center text-sm text-gray-500">
          <div class="flex items-center justify-center gap-6">
            <a href="#" class="hover:text-gray-900 transition-colors duration-200">Help</a>
            <a href="#" class="hover:text-gray-900 transition-colors duration-200">Privacy</a>
            <a href="#" class="hover:text-gray-900 transition-colors duration-200">Terms</a>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Enhanced shadows */
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Background gradient animation */
.from-red-50 {
  animation: gradientFlow 8s ease infinite;
}

@keyframes gradientFlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Ensure proper height on mobile */
@media (max-width: 768px) {
  .min-h-screen {
    min-height: 100vh;
    min-height: -webkit-fill-available;
  }
}
</style>