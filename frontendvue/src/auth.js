// src/auth.js
import { reactive } from "vue";

const state = reactive({
  isAuthenticated: true, // por ahora lo dejamos siempre logueado
  username: localStorage.getItem("username") || "admin",
  token: localStorage.getItem("token") || null,
});

function login(username, token) {
  state.isAuthenticated = true;
  state.username = username;
  state.token = token;
  localStorage.setItem("username", username);
  if (token) localStorage.setItem("token", token);
}

function logout() {
  state.isAuthenticated = false;
  state.username = "";
  state.token = null;
  localStorage.removeItem("username");
  localStorage.removeItem("token");
}

export function useAuth() {
  return { state, login, logout };
}
