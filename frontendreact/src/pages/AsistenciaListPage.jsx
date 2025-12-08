// src/pages/AsistenciaListPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAsistencias, deleteAsistencia } from "../api/asistencias";

export default function AsistenciaListPage() {
  const [lista, setLista] = useState([]);
  const [error, setError] = useState("");

  const cargar = () => {
    setError("");
    getAsistencias()
      .then((data) => setLista(data))
      .catch(() => setError("No se pudieron cargar las asistencias"));
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar asistencia?")) return;
    try {
      await deleteAsistencia(id);
      cargar();
    } catch (err) {
      setError("No se pudo eliminar la asistencia");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Asistencias</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <Link to="/asistencias/nueva" className="btn btn-primary btn-sm">
          Nueva
        </Link>
      </div>

      <table className="table table-bordered table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Trabajador</th>
            <th>Fecha</th>
            <th>Turno</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              {/* aquí muestro lo que venga del backend: ajusta según tu serializer */}
              <td>{a.trabajador_nombre || a.trabajador}</td>
              <td>{a.fecha}</td>
              <td>{a.turno}</td>
              <td>{a.estado}</td>
              <td>
                <Link
                  to={`/asistencias/${a.id}`}
                  className="btn btn-sm btn-link"
                >
                  Editar
                </Link>
                <button
                  className="btn btn-sm btn-danger ms-2"
                  onClick={() => handleDelete(a.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}

          {lista.length === 0 && (
            <tr>
              <td colSpan="6">No hay asistencias registradas.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
