<!-- src/views/DesempenoFormView.vue -->
<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getDesempeno,
  createDesempeno,
  updateDesempeno,
} from "../api/desempenos";

const route = useRoute();
const router = useRouter();

const id = route.params.id;
const esEditar = computed(() => !!id);

const form = ref({
  trabajador_rut: "",
  trabajador_nombre: "",
  id_desempeno: "",
  forma_de_hacer_trabajos: "",
  posibles_quejas: "",
});

const error = ref("");

onMounted(async () => {
  if (esEditar.value) {
    try {
      const data = await getDesempeno(id);
      form.value = {
        trabajador_rut: data.trabajador_rut || "",
        trabajador_nombre: data.trabajador_nombre || "",
        id_desempeno: data.id_desempeno ?? "",
        forma_de_hacer_trabajos: data.forma_de_hacer_trabajos || "",
        posibles_quejas: data.posibles_quejas || "",
      };
    } catch (e) {
      console.error(e);
      error.value = "No se pudo cargar el desempeño";
    }
  }
});

const validar = () => {
  if (!form.value.trabajador_rut || !form.value.trabajador_nombre) {
    return "RUT y nombre del trabajador son obligatorios.";
  }
  if (!form.value.id_desempeno && form.value.id_desempeno !== 0) {
    return "El ID de desempeño es obligatorio.";
  }
  return "";
};

const guardar = async (e) => {
  e.preventDefault();
  error.value = "";

  const msg = validar();
  if (msg) {
    error.value = msg;
    return;
  }

  try {
    const payload = {
      ...form.value,
      id_desempeno: Number(form.value.id_desempeno) || 0,
    };

    if (esEditar.value) {
      await updateDesempeno(id, payload);
    } else {
      await createDesempeno(payload);
    }

    router.push("/desempenos");
  } catch (e) {
    console.error(e);
    error.value = "Error al guardar el desempeño.";
  }
};

const cancelar = () => {
  router.push("/desempenos");
};
</script>

<template>
  <div class="container mt-4 col-md-6">
    <h3>
      {{ esEditar ? "Editar Desempeño de Trabajador" : "Nuevo Desempeño" }}
    </h3>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <form class="row g-3" @submit="guardar">
      <div class="col-md-6">
        <label class="form-label">RUT Trabajador</label>
        <input
          v-model="form.trabajador_rut"
          class="form-control"
          required
        />
      </div>

      <div class="col-md-6">
        <label class="form-label">Nombre Trabajador</label>
        <input
          v-model="form.trabajador_nombre"
          class="form-control"
          required
        />
      </div>

      <div class="col-md-6">
        <label class="form-label">ID Desempeño</label>
        <input
          type="number"
          v-model="form.id_desempeno"
          class="form-control"
          required
        />
      </div>

      <div class="col-12">
        <label class="form-label">Forma de hacer trabajos</label>
        <textarea
          v-model="form.forma_de_hacer_trabajos"
          class="form-control"
          rows="2"
        />
      </div>

      <div class="col-12">
        <label class="form-label">Posibles quejas</label>
        <textarea
          v-model="form.posibles_quejas"
          class="form-control"
          rows="2"
        />
      </div>

      <div class="col-12 mt-3">
        <button class="btn btn-success me-2" type="submit">
          Guardar
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          @click="cancelar"
        >
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>
