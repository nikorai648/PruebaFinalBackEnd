<script setup>
<template>
  <div class="container mt-5">
    <h1>Opciones del Sistema</h1>
    <p>Sistema de Trabajadores, Asistencias y Accidentes.</p>

    <ul>
      <li><RouterLink to="/trabajadores">Trabajadores</RouterLink></li>
      <li><RouterLink to="/asistencias">Asistencias</RouterLink></li>
      <li><RouterLink to="/accidentes">Accidentes</RouterLink></li>
      <li><RouterLink to="/eficiencias">Eficiencia de Trabajadores</RouterLink></li>
      <li><RouterLink to="/desempenos">Desempeño de Trabajadores</RouterLink></li>
      <li><RouterLink to="/sueldos">Sueldos</RouterLink></li>
    </ul>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  components: { RouterLink },
};
</script>
</script>

<template>
  <div class="container mt-4">
    <div class="p-4 bg-light rounded-3">
      <h1 class="h4 mb-2">Opciones del Sistema</h1>
      <p class="mb-4">Sistema de Trabajadores, Asistencias y Accidentes.</p>
      <div class="d-flex gap-2 flex-wrap">
        <RouterLink class="btn btn-primary" to="/trabajadores">
          Trabajadores
        </RouterLink>
      </div>
    </div>
  </div>
</template>
