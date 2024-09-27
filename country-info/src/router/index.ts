import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue"
import SingleCountry from "@/components/SingleCountry.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/country/:countryCode',
      name: 'country',
      component: SingleCountry
    }
  ]
})

export default router;
