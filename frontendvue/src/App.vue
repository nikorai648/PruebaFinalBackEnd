<!-- src/App.vue -->
<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark px-3">
    <RouterLink class="navbar-brand" to="/">Optimizacion y Logistica</RouterLink>

    <div class="navbar-nav me-auto">
      <RouterLink class="nav-link" to="/trabajadores">Trabajadores</RouterLink>
      <RouterLink class="nav-link" to="/asistencias">Asistencias</RouterLink>
      <RouterLink class="nav-link" to="/accidentes">Accidentes</RouterLink>
      <RouterLink class="nav-link" to="/eficiencias">Eficiencias</RouterLink>
      <RouterLink class="nav-link" to="/desempenos">Desempeños</RouterLink>
      <RouterLink class="nav-link" to="/sueldos">Sueldos</RouterLink>
    </div>

    <span class="navbar-text text-white me-3">
      Hola, {{ auth.state?.username || 'admin' }}
    </span>

    <button class="btn btn-outline-light btn-sm" @click="handleLogout">
      Salir
    </button>
  </nav>

  <!-- 🔹 AQUÍ se dibuja la página según la ruta -->
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import { useAuth } from "./auth";   // 👈 OJO: ruta relativa correcta

const auth = useAuth();
const router = useRouter();

const handleLogout = () => {
  auth.logout();
  router.push("/login");
};
</script>
