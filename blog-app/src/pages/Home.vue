<template>
  <div>
    <!-- Animated Header -->
    <div class="mb-12 text-center relative">
      <h1 class="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-600 mb-4 tracking-tight">
        Latest Stories
      </h1>
      <p class="text-slate-500 text-lg max-w-2xl mx-auto">
        Discover insights, tutorials, and thoughts on modern web development
      </p>
      <div class="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl"></div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20 space-y-4">
      <div class="relative w-16 h-16">
        <div class="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p class="text-slate-500 font-medium animate-pulse">Loading amazing content...</p>
    </div>

    <!-- Error State -->
    <div v-if="error" class="max-w-md mx-auto text-center py-16">
      <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
      </div>
      <h3 class="text-xl font-bold text-slate-800 mb-2">Oops! Something went wrong</h3>
      <p class="text-red-500 mb-6">{{ error }}</p>
      <button @click="reload" class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
        Try Again
      </button>
    </div>

    <!-- Posts Grid -->
    <div v-if="!loading && !error" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <article
        v-for="(post, index) in posts"
        :key="post.id"
        class="group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 border border-white/50 hover:-translate-y-2"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <!-- Gradient Top Border -->
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        
        <!-- Card Content -->
        <div class="p-6">
          <!-- Category Badge -->
          <div class="flex items-center gap-2 mb-4">
            <span class="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 rounded-full border border-blue-100">
              Article
            </span>
            <span class="text-xs text-slate-400">5 min read</span>
          </div>

          <h2 class="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors duration-300">
            {{ post.title }}
          </h2>
          
          <p class="text-slate-600 mb-6 line-clamp-3 leading-relaxed">
            {{ post.body }}
          </p>

          <RouterLink
            :to="'/posts/' + post.id"
            class="inline-flex items-center gap-2 text-blue-600 font-semibold group/link"
          >
            <span class="relative">
              Read Article
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover/link:w-full transition-all duration-300"></span>
            </span>
            <svg class="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </RouterLink>
        </div>

        <!-- Decorative Number -->
        <div class="absolute -bottom-4 -right-4 text-8xl font-black text-slate-100/50 select-none pointer-events-none group-hover:text-blue-50/50 transition-colors duration-500">
          {{ post.id }}
        </div>
      </article>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && !error && posts.length === 0" class="text-center py-20">
      <div class="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
      </div>
      <h3 class="text-xl font-bold text-slate-800">No posts yet</h3>
      <p class="text-slate-500">Check back later for new content!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { fetchPosts, Post } from "../api/posts"

const posts = ref<Post[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const reload = () => {
  loading.value = true
  error.value = null
  loadPosts()
}

const loadPosts = async () => {
  try {
    posts.value = await fetchPosts()
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(loadPosts)
</script>