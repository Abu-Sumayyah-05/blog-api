<template>
  <div class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>

    <!-- Glitch Effect 404 -->
    <div class="relative mb-8">
      <h1 class="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-600 to-cyan-600 select-none">
        404
      </h1>
      <div class="absolute inset-0 text-9xl font-black text-blue-600/20 select-none transform translate-x-2 translate-y-2 -z-10">
        404
      </div>
    </div>

    <!-- Message -->
    <h2 class="text-3xl font-bold text-slate-800 mb-4">Page Not Found</h2>
    <p class="text-lg text-slate-500 max-w-md mb-8 leading-relaxed">
      Oops! The page you are looking for seems to have vanished into the digital void.
    </p>

    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-4">
      <RouterLink
        to="/"
        class="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      >
        <span class="relative z-10 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          Go Back Home
        </span>
        <div class="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </RouterLink>

      <button 
        @click="$router.back()"
        class="px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 hover:-translate-y-1"
      >
        Go Back
      </button>
    </div>

    <!-- Decorative Elements -->
    <div class="mt-16 flex gap-2">
      <div v-for="i in 3" :key="i" class="w-2 h-2 rounded-full bg-blue-400 animate-bounce" :style="{ animationDelay: `${i * 200}ms` }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router"
const $router = useRouter()
</script>