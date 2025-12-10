<template>
  <div class="container mt-5">
    <div class="col-md-4">
      <h3>Ingreso (API Django)</h3>

      <div v-if="error" class="alert alert-danger">{{ error }}</div>

      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label class="form-label">Usuario</label>
          <input
            v-model="username"
            class="form-control"
            autocomplete="username"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input
            type="password"
            v-model="password"
            class="form-control"
            autocomplete="current-password"
            required
          />
        </div>

        <button class="btn btn-primary w-100">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginApi } from "../api/auth";
import { useAuth } from "../auth";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const error = ref("");

    const router = useRouter();
    const auth = useAuth();

    const handleSubmit = async () => {
      error.value = "";

      try {
        const data = await loginApi(username.value, password.value);
        auth.login(data.token, username.value);
        router.push("/");
      } catch (e) {
        error.value = "Credenciales inválidas o API no disponible.";
      }
    };

    return { username, password, error, handleSubmit };
  },
};
</script>
