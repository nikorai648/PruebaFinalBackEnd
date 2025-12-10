<!-- src/views/AsistenciaFormView.vue -->
<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getAsistencia,
  createAsistencia,
  updateAsistencia,
} from "../api/asistencias";

const route = useRoute();
const router = useRouter();

const id = route.params.id;
const esEditar = computed(() => !!id);

const form = ref({
  trabajador_rut: "",
  trabajador_nombre: "",
  fecha: "",
  hora_entrada: "",
  hora_salida: "",
  tipo_jornada: "DIURNA",
  observaciones: "",
});

const error = ref("");

onMounted(async () => {
  if (esEditar.value) {
    try {
      const data = await getAsistencia(id);
      form.value = {
        trabajador_rut: data.trabajador_rut || "",
        trabajador_nombre: data.trabajador_nombre || "",
        fecha: data.fecha || "",
        hora_entrada: data.hora_entrada || "",
        hora_salida: data.hora_salida || "",
        tipo_jornada: data.tipo_jornada || "DIURNA",
        observaciones: data.observaciones || "",
      };
    } catch (e) {
      console.error(e);
      error.value = "No se pudo cargar la asistencia";
    }
  }
});

const validar = () => {
  if (!form.value.trabajador_rut || !form.value.trabajador_nombre) {
    return "RUT y nombre del trabajador son obligatorios.";
  }
  if (!form.value.fecha) {
    return "La fecha es obligatoria.";
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
    if (esEditar.value) {
      await updateAsistencia(id, form.value);
    } else {
      await createAsistencia(form.value);
    }
    router.push("/asistencias");
  } catch (e) {
    console.error(e);
    error.value = "Error al guardar la asistencia.";
  }
};

const cancelar = () => {
  router.push("/asistencias");
};
</script>

<template>
  <div class="container mt-4 col-md-6">
    <h3>{{ esEditar ? "Editar Asistencia" : "Nueva Asistencia" }}</h3>

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
        <label class="form-label">Fecha</label>
        <input
          type="date"
          v-model="form.fecha"
          class="form-control"
          required
        />
      </div>

      <div class="col-md-3">
        <label class="form-label">Hora entrada</label>
        <input
          type="time"
          v-model="form.hora_entrada"
          class="form-control"
        />
      </div>

      <div class="col-md-3">
        <label class="form-label">Hora salida</label>
        <input
          type="time"
          v-model="form.hora_salida"
          class="form-control"
        />
      </div>

      <div class="col-md-6">
        <label class="form-label">Tipo jornada</label>
        <select
          v-model="form.tipo_jornada"
          class="form-select"
        >
          <option value="DIURNA">Diurna</option>
          <option value="NOCTURNA">Nocturna</option>
          <option value="ROTATIVA">Rotativa</option>
        </select>
      </div>

      <div class="col-12">
        <label class="form-label">Observaciones</label>
        <textarea
          v-model="form.observaciones"
          class="form-control"
          rows="2"
        ></textarea>
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
