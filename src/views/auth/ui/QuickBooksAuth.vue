<script setup>
import {baseUrl} from "@/utility/api.js";
import AlternativeAuthWraper from "@/views/auth/ui/AlternativeAuthWraper.vue";
import AuthWrapper from "@/views/auth/ui/AuthWrapper.vue";

const routeToBackend = ()=>{
  window.location.href = `${baseUrl}login`
}
</script>

<template>
  <AuthWrapper>
    <div class="w-full h-full flex flex-col justify-center items-center space-y-10">
      <!-- QuickBooks Logo - Larger and more prominent -->
      <div class="transform scale-110 hidden">
        <svg class="w-28 h-28" viewBox="0 0 50 50">
          <path d="M25 2C12.3 2 2 12.3 2 25s10.3 23 23 23 23-10.3 23-23S37.7 2 25 2zm6 33.5h-2.5v-4c-1.4 3.1-4.5 4.7-7.8 4.7-6.1 0-10.2-4.6-10.2-11.2 0-6.5 4.1-11.2 10.2-11.2 3.3 0 6.3 1.5 7.8 4.7v-4h2.5v21z" fill="#2CA01C"/>
          <path d="M21.1 16.8c-4.5 0-7.3 3.4-7.3 8.2 0 4.8 2.8 8.2 7.3 8.2 4.4 0 7.3-3.4 7.3-8.2 0-4.8-2.9-8.2-7.3-8.2z" fill="#2CA01C"/>
        </svg>
      </div>

      <!-- Connect Button - Clean and prominent -->
      <div class="w-full max-w-sm px-6">
        <button 
          type="" 
          class="w-full bg-red-500 hover:bg-red-600 text-white border-none hover:border-none py-5 rounded-xl font-semibold text-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
          @click="routeToBackend"
        >
          Connect QuickBooks
          <svg 
            class="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M13 7l5 5m0 0l-5 5m5-5H6" 
            />
          </svg>
        </button>
      </div>

      <!-- Minimal Security Indicator -->
      <div class="flex items-center gap-2 text-gray-500">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span class="text-sm">Secure Connection</span>
      </div>
    </div>
  </AuthWrapper>
</template>

<style scoped>
button {
  outline: none;
  transform: translateY(0);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

button:hover {
  transform: translateY(-2px);
}

button:active {
  transform: translateY(1px);
}

.shadow-lg {
  box-shadow: 0 10px 25px -5px rgba(239, 68, 68, 0.1), 
              0 8px 10px -6px rgba(239, 68, 68, 0.1);
}

.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(239, 68, 68, 0.15), 
              0 10px 10px -5px rgba(239, 68, 68, 0.15);
}
</style>