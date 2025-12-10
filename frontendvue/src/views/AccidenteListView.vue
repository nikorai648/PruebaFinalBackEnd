<!-- src/views/AccidenteListView.vue -->
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  getAccidentes,
  deleteAccidente,
} from "../api/accidentes";

const router = useRouter();

const accidentes = ref([]);
const loading = ref(true);
const error = ref("");

const cargarAccidentes = async () => {
  loading.value = true;
  error.value = "";

  try {
    accidentes.value = await getAccidentes();
  } catch (e) {
    console.error(e);
    error.value = e.message || "Error al cargar accidentes";
  } finally {
    loading.value = false;
  }
};

const irNuevo = () => {
  router.push("/accidentes/nuevo");
};

const irEditar = (id) => {
  router.push(`/accidentes/${id}`);
};

const eliminar = async (id) => {
  if (!confirm("¿Seguro que deseas eliminar este accidente?")) return;

  try {
    await deleteAccidente(id);
    accidentes.value = accidentes.value.filter((a) => a.id !== id);
  } catch (e) {
    console.error(e);
    alert("No se pudo eliminar el accidente");
  }
};

onMounted(cargarAccidentes);
</script>

<template>
  <div class="container mt-4">
    <h3>Accidentes</h3>

    <button class="btn btn-primary mb-3" @click="irNuevo">
      Nuevo
    </button>

    <div v-if="loading">Cargando accidentes...</div>
    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    <table v-else class="table table-sm table-striped">
      <thead>
        <tr>
          <th>RUT</th>
          <th>Nombre</th>
          <th>Fecha</th>
          <th>Tipo</th>
          <th>Gravedad</th>
          <th>Licencia</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="a in accidentes" :key="a.id">
          <td>{{ a.trabajador_rut }}</td>
          <td>{{ a.trabajador_nombre }}</td>
          <td>{{ a.fecha }}</td>
          <td>{{ a.tipo }}</td>
          <td>{{ a.gravedad }}</td>
          <td>
            <span v-if="a.requiere_licencia">
              Sí ({{ a.dias_licencia }} días)
            </span>
            <span v-else>No</span>
          </td>
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
        <tr v-if="accidentes.length === 0">
          <td colspan="7">No hay accidentes registrados.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
