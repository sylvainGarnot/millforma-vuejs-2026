import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/view/HomeView.vue'
import SearchView from '@/view/SearchView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },
    {
      path: '/search/:id',
      name: 'searchById',
      component: SearchView,
    },
    {
      path: '/team/:id',
      name: 'teamDetail',
      component: () => import('@/view/TeamView/_id.vue'),
    },
  ],
})

export default router
