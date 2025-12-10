// src/api/auth.js
import api from "./config";

export async function loginApi(username, password) {
  const res = await api.post("/api/token/", { username, password });
  return res.data; // { token: "..." }
}
