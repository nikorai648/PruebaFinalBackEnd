<template>
  <div>
    <Navbar v-if="auth.state.isAuthenticated" />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import { useAuth } from "./auth";

export default {
  components: { Navbar },
  setup() {
    const auth = useAuth();
    return { auth };
  },
};
</script>
