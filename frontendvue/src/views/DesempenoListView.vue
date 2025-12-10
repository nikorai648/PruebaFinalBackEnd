<!-- src/views/DesempenoListView.vue -->
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  getDesempenos,
  deleteDesempeno,
} from "../api/desempenos";

const router = useRouter();

const desempenos = ref([]);
const loading = ref(true);
const error = ref("");

const cargarDesempenos = async () => {
  loading.value = true;
  error.value = "";

  try {
    desempenos.value = await getDesempenos();
  } catch (e) {
    console.error(e);
    error.value = e.message || "Error al cargar desempeños";
  } finally {
    loading.value = false;
  }
};

const irNuevo = () => {
  router.push("/desempenos/nuevo");
};

const irEditar = (id) => {
  router.push(`/desempenos/${id}`);
};

const eliminar = async (id) => {
  if (!confirm("¿Seguro que deseas eliminar este desempeño?")) return;

  try {
    await deleteDesempeno(id);
    desempenos.value = desempenos.value.filter((d) => d.id !== id);
  } catch (e) {
    console.error(e);
    alert("No se pudo eliminar el desempeño");
  }
};

onMounted(cargarDesempenos);
</script>

<template>
  <div class="container mt-4">
    <h3>Desempeño de Trabajadores</h3>

    <button class="btn btn-primary mb-3" @click="irNuevo">
      Nuevo Desempeño
    </button>

    <div v-if="loading">Cargando desempeños...</div>
    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <table v-else class="table table-sm table-striped">
      <thead>
        <tr>
          <th>RUT</th>
          <th>Nombre</th>
          <th>ID Desempeño</th>
          <th>Forma de hacer trabajos</th>
          <th>Posibles quejas</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="d in desempenos" :key="d.id">
          <td>{{ d.trabajador_rut }}</td>
          <td>{{ d.trabajador_nombre }}</td>
          <td>{{ d.id_desempeno }}</td>
          <td>{{ d.forma_de_hacer_trabajos }}</td>
          <td>{{ d.posibles_quejas }}</td>
          <td>
            <button class="btn btn-link btn-sm" @click="irEditar(d.id)">
              Editar
            </button>
            <button class="btn btn-danger btn-sm" @click="eliminar(d.id)">
              Eliminar
            </button>
          </td>
        </tr>
        <tr v-if="desempenos.length === 0">
          <td colspan="6">No hay desempeños registrados.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
