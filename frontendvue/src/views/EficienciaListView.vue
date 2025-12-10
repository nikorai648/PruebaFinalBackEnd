<!-- src/views/EficienciaListView.vue -->
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  getEficiencias,
  deleteEficiencia,
} from "../api/eficiencias";

const router = useRouter();

const eficiencias = ref([]);
const loading = ref(true);
const error = ref("");

const cargarEficiencias = async () => {
  loading.value = true;
  error.value = "";

  try {
    eficiencias.value = await getEficiencias();
  } catch (e) {
    console.error(e);
    error.value = e.message || "Error al cargar eficiencias";
  } finally {
    loading.value = false;
  }
};

const irNuevo = () => {
  router.push("/eficiencias/nueva");
};

const irEditar = (id) => {
  router.push(`/eficiencias/${id}`);
};

const eliminar = async (id) => {
  if (!confirm("¿Seguro que deseas eliminar esta eficiencia?")) return;

  try {
    await deleteEficiencia(id);
    eficiencias.value = eficiencias.value.filter((e) => e.id !== id);
  } catch (e) {
    console.error(e);
    alert("No se pudo eliminar la eficiencia");
  }
};

onMounted(cargarEficiencias);
</script>

<template>
  <div class="container mt-4">
    <h3>Eficiencia de Trabajadores</h3>

    <button class="btn btn-primary mb-3" @click="irNuevo">
      Nueva Eficiencia
    </button>

    <div v-if="loading">Cargando eficiencias...</div>
    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    <table v-else class="table table-sm table-striped">
      <thead>
        <tr>
          <th>RUT</th>
          <th>Nombre</th>
          <th>ID Eficiencia</th>
          <th>Trabajos completados (1 mes)</th>
          <th>Sueldo promedio informado</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="e in eficiencias" :key="e.id">
          <td>{{ e.trabajador_rut }}</td>
          <td>{{ e.trabajador_nombre }}</td>
          <td>{{ e.id_eficiencia }}</td>
          <td>{{ e.trabajos_completados_en_1_mes }}</td>
          <td>{{ e.sueldo_promedio_informado }}</td>
          <td>
            <button
              class="btn btn-link btn-sm"
              @click="irEditar(e.id)"
            >
              Editar
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="eliminar(e.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>
        <tr v-if="eficiencias.length === 0">
          <td colspan="6">No hay eficiencias registradas.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
