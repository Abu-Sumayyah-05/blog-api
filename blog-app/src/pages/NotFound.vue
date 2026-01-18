<template>
  <div class="flex flex-col items-center justify-center h-[70vh] text-center space-y-6">
    <!-- Big error code -->
    <h1 class="text-6xl font-extrabold text-gray-800">404</h1>

    <!-- Error message -->
    <p class="text-xl text-gray-600">
      Oops! The page you are looking for does not exist.
    </p>

    <!-- Back to home button -->
    <RouterLink
      to="/"
      class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
    >
      Go Back Home
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
</script>
