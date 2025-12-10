// src/api/sueldos.js
import { API_URL, getAuthHeaders } from "./config";

// LISTAR
export async function getSueldos() {
  const res = await fetch(`${API_URL}/api/sueldos/`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error("Error al cargar sueldos");
  }
  return res.json();
}

// OBTENER UNO
export async function getSueldo(id) {
  const res = await fetch(`${API_URL}/api/sueldos/${id}/`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error("Error al cargar sueldo");
  }
  return res.json();
}

// CREAR
export async function createSueldo(data) {
  const res = await fetch(`${API_URL}/api/sueldos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("Error creación sueldo:", errorData);
    throw new Error("Error al crear sueldo");
  }
  return res.json();
}

// ACTUALIZAR
export async function updateSueldo(id, data) {
  const res = await fetch(`${API_URL}/api/sueldos/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("Error actualización sueldo:", errorData);
    throw new Error("Error al actualizar sueldo");
  }
  return res.json();
}

// ELIMINAR
export async function deleteSueldo(id) {
  const res = await fetch(`${API_URL}/api/sueldos/${id}/`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error("Error al eliminar sueldo");
  }
  return true;
}
