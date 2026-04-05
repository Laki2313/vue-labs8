import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: () => import('../views/CatalogView.vue')
  },
  {
    path: '/catalog/:id',
    name: 'ProductDetails',
    component: () => import('../views/ProductDetails.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router