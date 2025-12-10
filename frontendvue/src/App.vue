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
      Hola, {{ auth.state.username }}
    </span>

    <button class="btn btn-outline-light btn-sm" @click="handleLogout">
      Salir
    </button>
  </nav>
</template>

<script>
import { useRouter, RouterLink } from "vue-router";
import { useAuth } from "../auth";

export default {
  components: { RouterLink },
  setup() {
    const auth = useAuth();
    const router = useRouter();

    const handleLogout = () => {
      auth.logout();
      router.push("/login");
    };

    return { auth, handleLogout };
  },
};
</script>
