<script setup>
import { onMounted, ref, inject } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { getTrabajadores, deleteTrabajador } from '../api/fakeApi'

const router = useRouter()
const auth = inject('auth')

const trabajadores = ref([])
const error = ref('')

async function cargar() {
  try {
    trabajadores.value = await getTrabajadores()
  } catch (err) {
    error.value = 'Error cargando trabajadores'
  }
}

async function onDelete(id) {
  if (!window.confirm('¿Eliminar trabajador?')) return
  await deleteTrabajador(id)
  cargar()
}

onMounted(() => {
  if (!auth.isAuthenticated.value) {
    router.push('/login')
  } else {
    cargar()
  }
})
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>Trabajadores</h3>
      <RouterLink class="btn btn-primary" to="/trabajadores/nuevo">
        Nuevo
      </RouterLink>
    </div>

    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>RUT</th>
          <th>Nombre</th>
          <th>Turno</th>
          <th>Tipo</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="trabajadores.length === 0">
          <td colspan="5">Sin registros</td>
        </tr>
        <tr v-for="t in trabajadores" :key="t.id">
          <td>{{ t.rut }}</td>
          <td>{{ t.nombre }} {{ t.apellido }}</td>
          <td>{{ t.turno }}</td>
          <td>{{ t.tipo }}</td>
          <td class="text-end">
            <RouterLink
              class="btn btn-sm btn-secondary me-2"
              :to="`/trabajadores/${t.id}`"
            >
              Editar
            </RouterLink>
            <button class="btn btn-sm btn-danger" @click="onDelete(t.id)">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
