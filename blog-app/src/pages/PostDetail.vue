<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <!-- Loading / Error States -->
    <div v-if="loading" class="text-gray-500 text-lg text-center">Loading post...</div>
    <div v-else-if="error" class="text-red-500 text-lg text-center">{{ error }}</div>
    <div v-else-if="!post" class="text-gray-500 text-lg text-center">Post not found</div>

    <!-- Post Card -->
    <div v-else class="bg-white shadow-lg rounded-xl p-8">
      <h1 class="text-3xl font-bold mb-4 text-gray-900">{{ post.title }}</h1>
      <p class="text-gray-700 leading-relaxed mb-6">{{ post.body }}</p>
      <RouterLink
        to="/"
        class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition-colors"
      >
        ← Back to Home
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute, RouterLink } from "vue-router"
import { fetchPosts, Post } from "../api/posts"

const route = useRoute()
const post = ref<Post | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

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
