import { createRouter, createWebHistory } from "vue-router"
import Home from "../pages/Home.vue"
import PostDetail from "../pages/PostDetail.vue"
import NotFound from "../pages/NotFound.vue"

const routes = [
  { path: "/", component: Home },
  { path: "/posts/:id", component: PostDetail },
  { path: "/:pathMatch(.*)*", component: NotFound },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
