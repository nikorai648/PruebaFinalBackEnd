<!-- src/components/Navbar.vue -->
<script setup>
import { useContext } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { inject } from "vue";

// Supongo que estás usando provide/inject para Auth
const authContext = inject("authContext");
const router = useRouter();

const handleLogout = () => {
  authContext.logout();
  router.push("/login");
};
</script>

<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark px-3">
    <RouterLink class="navbar-brand" to="/">Optimizacion y Logistica</RouterLink>

    <div class="navbar-nav me-auto">
      <RouterLink class="nav-link" to="/trabajadores">Trabajadores</RouterLink>
      <RouterLink class="nav-link" to="/asistencias">Asistencias</RouterLink>
      <RouterLink class="nav-link" to="/accidentes">Accidentes</RouterLink>
      <RouterLink class="nav-link" to="/eficiencias"> Eficiencia</RouterLink>
      <RouterLink class="nav-link" to="/desempenos">Desempeño</RouterLink>

      <!-- luego agregaremos Accidentes, Eficiencias, etc. -->
    </div>

    <span class="navbar-text text-white me-3">
      Hola, {{ authContext.auth.username }}
    </span>

    <button class="btn btn-outline-light btn-sm" @click="handleLogout">
      Salir
    </button>
  </nav>
</template>
