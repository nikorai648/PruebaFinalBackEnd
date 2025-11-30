// src/api/fakeApi.js

// "Base de datos" en memoria solo para probar el front
let trabajadores = [
  {
    id: 1,
    rut: "11.111.111-1",
    nombre: "Juan",
    apellido: "Pérez",
    turno: "DIURNO",
    tipo: "Operario - INDEFINIDO",
  },
];

let currentId = 2;

// ---- LOGIN (simulado) ----
export function login(username, password) {
  // Más adelante esto será una llamada a la API Django con token
  if (username === "admin" && password === "admin") {
    return Promise.resolve({ token: "fake-token", username });
  }
  return Promise.reject(new Error("Credenciales inválidas."));
}

// ---- CRUD TRABAJADOR (simulado) ----
export function getTrabajadores() {
  return Promise.resolve([...trabajadores]);
}

export function getTrabajador(id) {
  const t = trabajadores.find((x) => x.id === Number(id));
  if (!t) return Promise.reject(new Error("No encontrado"));
  return Promise.resolve({ ...t });
}

export function createTrabajador(data) {
  const nuevo = { ...data, id: currentId++ };
  trabajadores.push(nuevo);
  return Promise.resolve(nuevo);
}

export function updateTrabajador(id, data) {
  const index = trabajadores.findIndex((x) => x.id === Number(id));
  if (index === -1) return Promise.reject(new Error("No encontrado"));
  trabajadores[index] = { ...trabajadores[index], ...data };
  return Promise.resolve(trabajadores[index]);
}

export function deleteTrabajador(id) {
  trabajadores = trabajadores.filter((t) => t.id !== Number(id));
  return Promise.resolve();
}
