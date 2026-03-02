<template>
  <div class="max-w-3xl mx-auto">
    <!-- Navigation Back -->
    <RouterLink
      to="/"
      class="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors group"
    >
      <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
        <svg class="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </div>
      <span class="font-medium">Back to all posts</span>
    </RouterLink>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20">
      <div class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <p class="text-slate-500">Loading post...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-16 bg-red-50 rounded-2xl border border-red-100">
      <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <p class="text-red-600 font-medium text-lg">{{ error }}</p>
    </div>

    <!-- Not Found -->
    <div v-else-if="!post" class="text-center py-16">
      <div class="text-6xl mb-4">📝</div>
      <h2 class="text-2xl font-bold text-slate-800 mb-2">Post not found</h2>
      <p class="text-slate-500">This article may have been removed or doesn't exist.</p>
    </div>

    <!-- Post Content -->
    <article v-else class="relative">
      <!-- Header Card -->
      <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-blue-900/5 border border-white/50 overflow-hidden mb-8">
        <div class="h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"></div>
        <div class="p-8 md:p-12">
          <!-- Meta -->
          <div class="flex items-center gap-4 mb-6">
            <span class="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              Featured Article
            </span>
            <span class="text-slate-400 text-sm flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {{ readingTime }} min read
            </span>
          </div>

          <!-- Title -->
          <h1 class="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            {{ post.title }}
          </h1>

          <!-- Author Info -->
          <div class="flex items-center gap-4 pt-6 border-t border-slate-100">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {{ post.title.charAt(0).toUpperCase() }}
            </div>
            <div>
              <p class="font-semibold text-slate-800">Author Name</p>
              <p class="text-sm text-slate-500">Published on {{ publishDate }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Body Content -->
      <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg shadow-blue-900/5 border border-white/50">
        <div class="prose prose-lg prose-slate max-w-none">
          <p class="text-xl text-slate-700 leading-relaxed whitespace-pre-line">
            {{ post.body }}
          </p>
          
          <!-- Simulated Content Expansion -->
          <div class="mt-8 space-y-4 text-slate-600 leading-relaxed">
            <p>{{ post.body }}</p>
            <p>{{ post.body }}</p>
          </div>
        </div>

        <!-- Tags -->
        <div class="mt-10 pt-8 border-t border-slate-200">
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in ['Vue', 'JavaScript', 'Web Dev', 'Tutorial']" :key="tag" 
              class="px-4 py-2 bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-lg text-sm font-medium transition-colors cursor-pointer">
              #{{ tag }}
            </span>
          </div>
        </div>

        <!-- Share -->
        <div class="mt-8 flex items-center justify-between">
          <span class="text-slate-500 font-medium">Share this article:</span>
          <div class="flex gap-3">
            <button v-for="icon in ['twitter', 'facebook', 'linkedin']" :key="icon"
              class="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 flex items-center justify-center transition-all hover:scale-110">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path v-if="icon === 'twitter'" d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                <path v-if="icon === 'facebook'" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                <path v-if="icon === 'linkedin'" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { useRoute, RouterLink } from "vue-router"
import { fetchPosts, Post } from "../api/posts"

const route = useRoute()
const post = ref<Post | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const readingTime = computed(() => {
  if (!post.value) return 0
  const words = post.value.body.split(' ').length
  return Math.ceil(words / 200)
})

const publishDate = computed(() => {
  return new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
})

onMounted(async () => {
  try {
    const posts = await fetchPosts()
    const found = posts.find((p) => p.id === Number(route.params.id))
    if (!found) throw new Error("Post not found")
    post.value = found
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>