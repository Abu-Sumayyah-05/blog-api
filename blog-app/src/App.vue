<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
    <header class="border-b bg-white/80 backdrop-blur">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 class="text-xl font-bold tracking-tight text-gray-900">
          Vue Blog
        </h1>

        <nav class="space-x-4 text-sm font-medium">
          <RouterLink
            to="/"
            class="text-gray-600 hover:text-blue-600 transition"
          >
            Home
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 py-10">
      <RouterView />
    </main>

    <footer class="border-t bg-white mt-16">
      <div class="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500 text-center">
        © 2026 — Built with Vue & Tailwind
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router"
</script>
