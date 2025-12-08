// src/api/asistencias.js
import { API_URL, getAuthHeaders } from "./config";

// 🔹 Listar asistencias
export async function getAsistencias() {
  const res = await fetch(`${API_URL}/api/asistencias/`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error("Error al cargar asistencias");
  }
  return res.json();
}

// 🔹 Obtener una asistencia por ID
export async function getAsistencia(id) {
  const res = await fetch(`${API_URL}/api/asistencias/${id}/`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error("Error al cargar asistencia");
  }
  return res.json();
}

// 🔹 Crear asistencia
export async function createAsistencia(data) {
  const res = await fetch(`${API_URL}/api/asistencias/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("Error creación asistencia:", errorData);
    throw new Error("Error al crear asistencia");
  }
  return res.json();
}

// 🔹 Actualizar asistencia
export async function updateAsistencia(id, data) {
  const res = await fetch(`${API_URL}/api/asistencias/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("Error actualización asistencia:", errorData);
    throw new Error("Error al actualizar asistencia");
  }
  return res.json();
}

// 🔹 Eliminar asistencia
export async function deleteAsistencia(id) {
  const res = await fetch(`${API_URL}/api/asistencias/${id}/`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error("Error al eliminar asistencia");
  }
  return true;
}
