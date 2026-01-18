<template>
  <div>
    <h1 class="text-4xl font-extrabold text-gray-800 mb-8">Blog Posts</h1>

    <!-- Loading / Error -->
    <div v-if="loading" class="text-gray-500 text-lg">Loading posts...</div>
    <div v-if="error" class="text-red-500 text-lg">{{ error }}</div>

    <!-- Posts Grid -->
    <div v-if="!loading && !error" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="post in posts"
        :key="post.id"
        class="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
      >
        <h2 class="text-2xl font-semibold mb-2 text-gray-900">{{ post.title }}</h2>
        <p class="text-gray-600 mb-4">{{ post.body.slice(0, 100) }}...</p>
        <RouterLink
          :to="'/posts/' + post.id"
          class="text-blue-600 hover:text-blue-800 font-medium"
        >
          Read More →
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { fetchPosts, Post } from "../api/posts"

const posts = ref<Post[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    posts.value = await fetchPosts()
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>