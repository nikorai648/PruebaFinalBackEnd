<!-- src/views/SueldoListView.vue -->
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getSueldos, deleteSueldo } from "../api/sueldos";

const router = useRouter();

const sueldos = ref([]);
const loading = ref(true);
const error = ref("");

const cargarSueldos = async () => {
  loading.value = true;
  error.value = "";
  try {
    sueldos.value = await getSueldos();
  } catch (e) {
    console.error(e);
    error.value = e.message || "Error al cargar sueldos";
  } finally {
    loading.value = false;
  }
};

const irNuevo = () => {
  router.push("/sueldos/nuevo");
};

const irEditar = (id) => {
  router.push(`/sueldos/${id}`);
};

const eliminar = async (id) => {
  if (!confirm("¿Seguro que deseas eliminar este sueldo?")) return;
  try {
    await deleteSueldo(id);
    sueldos.value = sueldos.value.filter((s) => s.id !== id);
  } catch (e) {
    console.error(e);
    alert("No se pudo eliminar el sueldo");
  }
};

onMounted(cargarSueldos);
</script>

<template>
  <div class="container mt-4">
    <h3>Sueldos de Trabajadores</h3>

    <button class="btn btn-primary mb-3" @click="irNuevo">
      Nuevo Sueldo
    </button>

    <div v-if="loading">Cargando sueldos...</div>
    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <table v-else class="table table-sm table-striped">
      <thead>
        <tr>
          <th>RUT</th>
          <th>Nombre</th>
          <th>Mes</th>
          <th>Cant. Trabajos</th>
          <th>Tipo Trabajos</th>
          <th>Sueldo Total</th>
          <th>ID Eficiencia Asociada</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="s in sueldos" :key="s.id">
          <td>{{ s.trabajador_rut }}</td>
          <td>{{ s.trabajador_nombre }}</td>
          <td>{{ s.mes }}</td>
          <td>{{ s.cantidad_trabajos_mes }}</td>
          <td>{{ s.tipo_trabajos_mes }}</td>
          <td>\${{ s.sueldo_total_mes }}</td>
          <td>{{ s.id_eficiencia_asociada }}</td>
          <td>
            <button class="btn btn-link btn-sm" @click="irEditar(s.id)">
              Editar
            </button>
            <button class="btn btn-danger btn-sm" @click="eliminar(s.id)">
              Eliminar
            </button>
          </td>
        </tr>
        <tr v-if="sueldos.length === 0">
          <td colspan="8">No hay sueldos registrados.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
