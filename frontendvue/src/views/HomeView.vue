<script setup>
import { RouterLink } from 'vue-router'
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
