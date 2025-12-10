// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "../auth";

import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";

import TrabajadorListView from "../views/TrabajadorListView.vue";
import TrabajadorFormView from "../views/TrabajadorFormView.vue";

// Más vistas luego: Asistencia, Accidente, Eficiencia, Desempeño, Sueldo...

const routes = [
  { path: "/login", name: "Login", component: LoginView },
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: { requiresAuth: true },
  },

  // TRABAJADORES
  {
    path: "/trabajadores",
    name: "Trabajadores",
    component: TrabajadorListView,
    meta: { requiresAuth: true },
  },
  {
    path: "/trabajadores/nuevo",
    name: "TrabajadorNuevo",
    component: TrabajadorFormView,
    meta: { requiresAuth: true },
  },
  {
    path: "/trabajadores/:id",
    name: "TrabajadorEditar",
    component: TrabajadorFormView,
    meta: { requiresAuth: true },
    props: true,
  },

  // Aquí después agregas Asistencias, Accidentes, etc.
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Protección de rutas
router.beforeEach((to, from, next) => {
  const { state } = useAuth();
  if (to.meta.requiresAuth && !state.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
