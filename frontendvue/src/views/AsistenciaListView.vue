<!-- src/views/AsistenciaListView.vue -->
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  getAsistencias,
  deleteAsistencia,
} from "../api/asistencias";

const router = useRouter();

const asistencias = ref([]);
const loading = ref(true);
const error = ref("");

const cargarAsistencias = async () => {
  loading.value = true;
  error.value = "";

  try {
    asistencias.value = await getAsistencias();
  } catch (e) {
    console.error(e);
    error.value = e.message || "Error al cargar asistencias";
  } finally {
    loading.value = false;
  }
};

const irNueva = () => {
  router.push("/asistencias/nueva");
};

const irEditar = (id) => {
  router.push(`/asistencias/${id}`);
};

const eliminar = async (id) => {
  if (!confirm("¿Seguro que deseas eliminar esta asistencia?")) return;

  try {
    await deleteAsistencia(id);
    asistencias.value = asistencias.value.filter((a) => a.id !== id);
  } catch (e) {
    console.error(e);
    alert("No se pudo eliminar la asistencia");
  }
};

onMounted(cargarAsistencias);
</script>

<template>
  <div class="container mt-4">
    <h3>Asistencias</h3>

    <button class="btn btn-primary mb-3" @click="irNueva">
      Nueva
    </button>

    <div v-if="loading">Cargando asistencias...</div>
    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    <table v-else class="table table-sm table-striped">
      <thead>
        <tr>
          <th>RUT</th>
          <th>Nombre</th>
          <th>Fecha</th>
          <th>Estado / Jornada</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="a in asistencias" :key="a.id">
          <td>{{ a.trabajador_rut }}</td>
          <td>{{ a.trabajador_nombre }}</td>
          <td>{{ a.fecha }}</td>
          <td>{{ a.estado || a.tipo_jornada }}</td>
          <td>
            <button
              class="btn btn-link btn-sm"
              @click="irEditar(a.id)"
            >
              Editar
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="eliminar(a.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>
        <tr v-if="asistencias.length === 0">
          <td colspan="5">No hay asistencias registradas.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
