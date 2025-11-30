// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from './views/LoginView.vue'
import HomeView from './views/HomeView.vue'
import TrabajadorListView from './views/TrabajadorListView.vue'
import TrabajadorFormView from './views/TrabajadorFormView.vue'

const routes = [
  { path: '/login', name: 'login', component: LoginView },
  { path: '/', name: 'home', component: HomeView },
  { path: '/trabajadores', name: 'trabajadores', component: TrabajadorListView },
  { path: '/trabajadores/nuevo', name: 'trabajador-new', component: TrabajadorFormView },
  { path: '/trabajadores/:id', name: 'trabajador-edit', component: TrabajadorFormView, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
