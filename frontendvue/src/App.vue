<script setup>
import { ref, provide } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'

const isAuthenticated = ref(false)
const username = ref(null)

function handleLogin(user) {
  isAuthenticated.value = true
  username.value = user
}

function handleLogout() {
  isAuthenticated.value = false
  username.value = null
}

// Compartimos el estado de auth con otros componentes
provide('auth', {
  isAuthenticated,
  username,
  logout: handleLogout,
})
</script>

<template>
  <div>
    <Navbar v-if="isAuthenticated" />
    <RouterView @login-success="handleLogin" />
  </div>
</template>
