<!-- src/views/SueldoFormView.vue -->
<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getSueldo, createSueldo, updateSueldo } from "../api/sueldos";

const route = useRoute();
const router = useRouter();

const id = route.params.id;
const esEditar = computed(() => !!id);

const form = ref({
  trabajador_rut: "",
  trabajador_nombre: "",
  mes: "",
  cantidad_trabajos_mes: 0,
  tipo_trabajos_mes: "",
  sueldo_total_mes: 0,
  id_eficiencia_asociada: "",
});

const error = ref("");

onMounted(async () => {
  if (esEditar.value) {
    try {
      const data = await getSueldo(id);
      form.value = {
        trabajador_rut: data.trabajador_rut || "",
        trabajador_nombre: data.trabajador_nombre || "",
        mes: data.mes || "",
        cantidad_trabajos_mes: data.cantidad_trabajos_mes ?? 0,
        tipo_trabajos_mes: data.tipo_trabajos_mes || "",
        sueldo_total_mes: data.sueldo_total_mes ?? 0,
        id_eficiencia_asociada: data.id_eficiencia_asociada ?? "",
      };
    } catch (e) {
      console.error(e);
      error.value = "No se pudo cargar el sueldo";
    }
  }
});

const validar = () => {
  if (!form.value.trabajador_rut || !form.value.trabajador_nombre) {
    return "RUT y nombre del trabajador son obligatorios.";
  }
  if (!form.value.mes) {
    return "El mes es obligatorio (ej: 2025-11).";
  }
  if (form.value.cantidad_trabajos_mes < 0) {
    return "La cantidad de trabajos no puede ser negativa.";
  }
  if (form.value.sueldo_total_mes < 0) {
    return "El sueldo no puede ser negativo.";
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
      cantidad_trabajos_mes:
        Number(form.value.cantidad_trabajos_mes) || 0,
      sueldo_total_mes: Number(form.value.sueldo_total_mes) || 0,
      id_eficiencia_asociada:
        form.value.id_eficiencia_asociada === ""
          ? null
          : Number(form.value.id_eficiencia_asociada),
    };

    if (esEditar.value) {
      await updateSueldo(id, payload);
    } else {
      await createSueldo(payload);
    }

    router.push("/sueldos");
  } catch (e) {
    console.error(e);
    error.value = "Error al guardar el sueldo.";
  }
};

const cancelar = () => {
  router.push("/sueldos");
};
</script>

<template>
  <div class="container mt-4 col-md-6">
    <h3>{{ esEditar ? "Editar Sueldo" : "Nuevo Sueldo" }}</h3>

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
        <label class="form-label">Mes (ej: 2025-11)</label>
        <input
          v-model="form.mes"
          class="form-control"
          placeholder="2025-11"
          required
        />
      </div>

      <div class="col-md-6">
        <label class="form-label">Cantidad de trabajos en el mes</label>
        <input
          type="number"
          v-model="form.cantidad_trabajos_mes"
          class="form-control"
          min="0"
        />
      </div>

      <div class="col-12">
        <label class="form-label">Tipo de trabajos del mes</label>
        <input
          v-model="form.tipo_trabajos_mes"
          class="form-control"
        />
      </div>

      <div class="col-md-6">
        <label class="form-label">Sueldo total del mes</label>
        <input
          type="number"
          step="0.01"
          v-model="form.sueldo_total_mes"
          class="form-control"
          min="0"
        />
      </div>

      <div class="col-md-6">
        <label class="form-label">
          ID Eficiencia asociada (opcional)
        </label>
        <input
          type="number"
          v-model="form.id_eficiencia_asociada"
          class="form-control"
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
