<template>
  <div class="container mt-4">
    <h3>Trabajadores</h3>

    <RouterLink class="btn btn-primary mb-3" to="/trabajadores/nuevo">
      Nuevo
    </RouterLink>

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
        <tr v-for="t in trabajadores" :key="t.id">
          <td>{{ t.rut }}</td>
          <td>{{ t.nombre }} {{ t.apellido }}</td>
          <td>{{ t.turno }}</td>
          <td>{{ t.tipo }}</td>
          <td>
            <RouterLink
              class="btn btn-sm btn-link"
              :to="`/trabajadores/${t.id}`"
            >
              Editar
            </RouterLink>
            <button class="btn btn-sm btn-danger" @click="remove(t.id)">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import {
  getTrabajadores,
  deleteTrabajador,
} from "../api/trabajadores";

export default {
  components: { RouterLink },
  setup() {
    const trabajadores = ref([]);
    const error = ref("");

    const cargar = async () => {
      try {
        trabajadores.value = await getTrabajadores();
      } catch (e) {
        error.value = "Error al cargar trabajadores";
      }
    };

    const remove = async (id) => {
      if (!confirm("¿Eliminar trabajador?")) return;
      try {
        await deleteTrabajador(id);
        await cargar();
      } catch (e) {
        error.value = "Error al eliminar trabajador";
      }
    };

    onMounted(cargar);

    return { trabajadores, error, remove };
  },
};
</script>
