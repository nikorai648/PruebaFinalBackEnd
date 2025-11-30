<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../api/fakeApi'

const router = useRouter()
const emit = defineEmits(['login-success'])

const username = ref('')
const password = ref('')
const error = ref('')

async function onSubmit() {
  error.value = ''

  if (!username.value || !password.value) {
    error.value = 'Usuario y contraseña son obligatorios.'
    return
  }

  try {
    const res = await login(username.value, password.value)
    emit('login-success', res.username)
    router.push('/')
  } catch (err) {
    error.value = 'Credenciales inválidas.'
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="col-md-4">
      <h3>Ingreso</h3>

      <div v-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label class="form-label">Usuario</label>
          <input v-model="username" class="form-control" autocomplete="username" />
        </div>
        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            autocomplete="current-password"
          />
        </div>
        <button class="btn btn-primary w-100">Entrar</button>
      </form>
    </div>
  </div>
</template>
