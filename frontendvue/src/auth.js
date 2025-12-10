// src/auth.js
import { reactive, toRefs } from "vue";

const state = reactive({
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  username: localStorage.getItem("username"),
});

function login(token, username) {
  state.isAuthenticated = true;
  state.token = token;
  state.username = username;

  localStorage.setItem("token", token);
  localStorage.setItem("username", username);
}

function logout() {
  state.isAuthenticated = false;
  state.token = null;
  state.username = null;

  localStorage.removeItem("token");
  localStorage.removeItem("username");
}

export function useAuth() {
  return {
    ...toRefs(state),
    login,
    logout,
  };
}
