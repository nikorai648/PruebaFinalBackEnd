<!-- src/views/HomeView.vue -->
<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="container mt-5">
    <h1>Opciones del Sistema</h1>
    <p>Sistema de Trabajadores, Asistencias y Accidentes.</p>

    <ul>
      <li>
        <RouterLink to="/trabajadores">Trabajadores</RouterLink>
      </li>
      <li>
        <RouterLink to="/asistencias">Asistencias</RouterLink>
      </li>
      <li>
        <RouterLink to="/accidentes">Accidentes</RouterLink>
      </li>
       <li>
        <RouterLink to="/eficiencias">Eficiencia de Trabajadores</RouterLink>
      </li>
      <!-- después agregamos Accidentes, Eficiencias, etc. -->
    </ul>
  </div>
</template>
