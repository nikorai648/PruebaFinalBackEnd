// src/api/desempenos.js
import { API_URL, getAuthHeaders } from "./config";

// LISTAR
export async function getDesempenos() {
  const res = await fetch(`${API_URL}/api/desempenos/`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error("Error al cargar desempeños");
  }
  return res.json();
}

// OBTENER UNO
export async function getDesempeno(id) {
  const res = await fetch(`${API_URL}/api/desempenos/${id}/`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error("Error al cargar desempeño");
  }
  return res.json();
}

// CREAR
export async function createDesempeno(data) {
  const res = await fetch(`${API_URL}/api/desempenos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("Error creación desempeño:", errorData);
    throw new Error("Error al crear desempeño");
  }
  return res.json();
}

// ACTUALIZAR
export async function updateDesempeno(id, data) {
  const res = await fetch(`${API_URL}/api/desempenos/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("Error actualización desempeño:", errorData);
    throw new Error("Error al actualizar desempeño");
  }
  return res.json();
}

// ELIMINAR
export async function deleteDesempeno(id) {
  const res = await fetch(`${API_URL}/api/desempenos/${id}/`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error("Error al eliminar desempeño");
  }
  return true;
}
