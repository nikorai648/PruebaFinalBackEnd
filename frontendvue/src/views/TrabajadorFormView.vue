<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createTrabajador, getTrabajador, updateTrabajador } from '../api/fakeApi'

const route = useRoute()
const router = useRouter()

const esEditar = ref(false)
const error = ref('')

const form = ref({
  rut: '',
  nombre: '',
  apellido: '',
  turno: 'DIURNO',
  tipo: '',
})

onMounted(async () => {
  if (route.params.id) {
    esEditar.value = true
    try {
      const data = await getTrabajador(route.params.id)
      form.value = data
    } catch (err) {
      error.value = 'No se pudo cargar el trabajador'
    }
  }
})

function validar() {
  if (!form.value.rut || !form.value.nombre || !form.value.apellido) {
    return 'RUT, nombre y apellido son obligatorios.'
  }
  if (form.value.rut.length < 8) {
    return 'RUT demasiado corto.'
  }
  return ''
}

async function onSubmit() {
  error.value = ''
  const msg = validar()
  if (msg) {
    error.value = msg
    return
  }

  try {
    if (esEditar.value) {
      await updateTrabajador(route.params.id, form.value)
    } else {
      await createTrabajador(form.value)
    }
    router.push('/trabajadores')
  } catch (err) {
    error.value = 'Error guardando trabajador'
  }
}
</script>

<template>
  <div class="container mt-4 col-md-6">
    <h3>{{ esEditar ? 'Editar Trabajador' : 'Nuevo Trabajador' }}</h3>

    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <form class="row g-3" @submit.prevent="onSubmit">
      <div class="col-12">
        <label class="form-label">RUT</label>
        <input v-model="form.rut" class="form-control" />
      </div>

      <div class="col-md-6">
        <label class="form-label">Nombre</label>
        <input v-model="form.nombre" class="form-control" />
      </div>

      <div class="col-md-6">
        <label class="form-label">Apellido</label>
        <input v-model="form.apellido" class="form-control" />
      </div>

      <div class="col-md-6">
        <label class="form-label">Turno</label>
        <select v-model="form.turno" class="form-select">
          <option value="DIURNO">Diurno</option>
          <option value="NOCTURNO">Nocturno</option>
          <option value="ROTATIVO">Rotativo</option>
        </select>
      </div>

      <div class="col-md-6">
        <label class="form-label">Tipo (cargo + contrato)</label>
        <input
          v-model="form.tipo"
          class="form-control"
          placeholder="Operario - INDEFINIDO"
        />
      </div>

      <div class="col-12 mt-3">
        <button class="btn btn-success me-2">Guardar</button>
        <button type="button" class="btn btn-secondary" @click="router.push('/trabajadores')">
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

