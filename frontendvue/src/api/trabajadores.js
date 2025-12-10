import api from "./config";

export async function getTrabajadores() {
  const res = await api.get("/api/trabajadores/");
  return res.data;
}

export async function getTrabajador(id) {
  const res = await api.get(`/api/trabajadores/${id}/`);
  return res.data;
}

export async function createTrabajador(data) {
  const res = await api.post("/api/trabajadores/", data);
  return res.data;
}

export async function updateTrabajador(id, data) {
  const res = await api.put(`/api/trabajadores/${id}/`, data);
  return res.data;
}

export async function deleteTrabajador(id) {
  await api.delete(`/api/trabajadores/${id}/`);
}
