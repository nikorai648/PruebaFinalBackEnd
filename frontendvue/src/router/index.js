// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";

import TrabajadorListView from "../views/TrabajadorListView.vue";
import TrabajadorFormView from "../views/TrabajadorFormView.vue";

import AsistenciaListView from "../views/AsistenciaListView.vue";
import AsistenciaFormView from "../views/AsistenciaFormView.vue";

import AccidenteListView from "../views/AccidenteListView.vue";
import AccidenteFormView from "../views/AccidenteFormView.vue";

import EficienciaListView from "../views/EficienciaListView.vue";
import EficienciaFormView from "../views/EficienciaFormView.vue";
// ... (otras vistas que ya tengas)

const routes = [
  { path: "/login", name: "login", component: LoginView },
  { path: "/", name: "home", component: HomeView },

  // Trabajadores
  { path: "/trabajadores", component: TrabajadorListView },
  { path: "/trabajadores/nuevo", component: TrabajadorFormView },
  { path: "/trabajadores/:id", component: TrabajadorFormView, props: true },

  // 👉 Asistencias
  { path: "/asistencias", component: AsistenciaListView },
  { path: "/asistencias/nueva", component: AsistenciaFormView },
  { path: "/asistencias/:id", component: AsistenciaFormView, props: true },

  // Accidentes
  { path: "/accidentes", component: AccidenteListView },
  { path: "/accidentes/nuevo", component: AccidenteFormView },
  { path: "/accidentes/:id", component: AccidenteFormView, props: true },

  { path: "/eficiencias", component: EficienciaListView },
  { path: "/eficiencias/nueva", component: EficienciaFormView },
  { path: "/eficiencias/:id", component: EficienciaFormView, props: true },

  // aquí luego irán accidentes, eficiencia, etc.
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
