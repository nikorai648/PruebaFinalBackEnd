<script setup>
import { inject } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const auth = inject('auth')
const router = useRouter()

function onLogout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark px-3">
    <RouterLink class="navbar-brand" to="/">Optimizacion y Logistica</RouterLink>

    <div class="navbar-nav me-auto">
      <RouterLink class="nav-link" to="/trabajadores">
        Trabajadores
      </RouterLink>
    </div>

    <span class="navbar-text text-white me-3">
      Hola, {{ auth.username }}
    </span>

    <button class="btn btn-outline-light btn-sm" @click="onLogout">
      Salir
    </button>
  </nav>
</template>
