<!-- src/views/AccidenteFormView.vue -->
<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getAccidente,
  createAccidente,
  updateAccidente,
} from "../api/accidentes";

const route = useRoute();
const router = useRouter();

const id = route.params.id;
const esEditar = computed(() => !!id);

const form = ref({
  trabajador_rut: "",
  trabajador_nombre: "",
  fecha: "",
  tipo: "",
  gravedad: "LEVE",
  lugar: "",
  requiere_licencia: false,
  dias_licencia: 0,
  observaciones: "",
});

const error = ref("");

onMounted(async () => {
  if (esEditar.value) {
    try {
      const data = await getAccidente(id);
      form.value = {
        trabajador_rut: data.trabajador_rut || "",
        trabajador_nombre: data.trabajador_nombre || "",
        fecha: data.fecha || "",
        tipo: data.tipo || "",
        gravedad: data.gravedad || "LEVE",
        lugar: data.lugar || "",
        requiere_licencia: !!data.requiere_licencia,
        dias_licencia: data.dias_licencia ?? 0,
        observaciones: data.observaciones || "",
      };
    } catch (e) {
      console.error(e);
      error.value = "No se pudo cargar el accidente";
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
  if (!form.value.tipo) {
    return "El tipo de accidente es obligatorio.";
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
      dias_licencia: Number(form.value.dias_licencia) || 0,
    };

    if (esEditar.value) {
      await updateAccidente(id, payload);
    } else {
      await createAccidente(payload);
    }
    router.push("/accidentes");
  } catch (e) {
    console.error(e);
    error.value = "Error al guardar el accidente.";
  }
};

const cancelar = () => {
  router.push("/accidentes");
};
</script>

<template>
  <div class="container mt-4 col-md-6">
    <h3>{{ esEditar ? "Editar Accidente" : "Nuevo Accidente" }}</h3>

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

      <div class="col-md-6">
        <label class="form-label">Lugar</label>
        <input
          v-model="form.lugar"
          class="form-control"
        />
      </div>

      <div class="col-md-6">
        <label class="form-label">Tipo de accidente</label>
        <input
          v-model="form.tipo"
          class="form-control"
          placeholder="Caída, golpe, etc."
          required
        />
      </div>

      <div class="col-md-6">
        <label class="form-label">Gravedad</label>
        <select
          v-model="form.gravedad"
          class="form-select"
        >
          <option value="LEVE">Leve</option>
          <option value="MODERADA">Moderada</option>
          <option value="GRAVE">Grave</option>
          <option value="FATAL">Fatal</option>
        </select>
      </div>

      <div class="col-md-6">
        <label class="form-label">Requiere licencia</label>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="requiereLicencia"
            v-model="form.requiere_licencia"
          />
          <label class="form-check-label" for="requiereLicencia">
            Sí, requiere licencia
          </label>
        </div>
      </div>

      <div class="col-md-6" v-if="form.requiere_licencia">
        <label class="form-label">Días de licencia</label>
        <input
          type="number"
          min="0"
          v-model="form.dias_licencia"
          class="form-control"
        />
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
