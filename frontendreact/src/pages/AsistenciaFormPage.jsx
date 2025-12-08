// src/pages/AsistenciaFormPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createAsistencia,
  getAsistencia,
  updateAsistencia,
} from "../api/asistencias";
import { getTrabajadores } from "../api/trabajadores";

const initialForm = {
  trabajador: "",   // ID del trabajador
  fecha: "",        // formato YYYY-MM-DD
  turno: "DIURNO",
  estado: "ASISTIO",
  observacion: "",
};

export default function AsistenciaFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [trabajadores, setTrabajadores] = useState([]);
  const [error, setError] = useState("");

  const esEditar = Boolean(id);

  // cargar trabajadores para el select
  useEffect(() => {
    getTrabajadores()
      .then((data) => setTrabajadores(data))
      .catch(() => setError("No se pudieron cargar los trabajadores"));
  }, []);

  // si es editar, cargar asistencia
  useEffect(() => {
    if (esEditar) {
      getAsistencia(id)
        .then((data) => setForm(data))
        .catch(() => setError("No se pudo cargar la asistencia"));
    }
  }, [id, esEditar]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validar = () => {
    if (!form.trabajador) return "Debe seleccionar un trabajador.";
    if (!form.fecha) return "La fecha es obligatoria.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = validar();
    if (msg) {
      setError(msg);
      return;
    }

    try {
      if (esEditar) {
        await updateAsistencia(id, form);
      } else {
        await createAsistencia(form);
      }
      navigate("/asistencias");
    } catch (err) {
      console.error(err);
      setError("Error guardando asistencia");
    }
  };

  return (
    <div className="container mt-4 col-md-6">
      <h3>{esEditar ? "Editar Asistencia" : "Nueva Asistencia"}</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-12">
          <label className="form-label">Trabajador</label>
          <select
            name="trabajador"
            className="form-select"
            value={form.trabajador || ""}
            onChange={handleChange}
          >
            <option value="">-- Seleccione --</option>
            {trabajadores.map((t) => (
              <option key={t.id} value={t.id}>
                {t.rut} - {t.nombre} {t.apellido}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            name="fecha"
            className="form-control"
            value={form.fecha || ""}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Turno</label>
          <select
            name="turno"
            className="form-select"
            value={form.turno}
            onChange={handleChange}
          >
            <option value="DIURNO">Diurno</option>
            <option value="NOCTURNO">Nocturno</option>
            <option value="ROTATIVO">Rotativo</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Estado</label>
          <select
            name="estado"
            className="form-select"
            value={form.estado}
            onChange={handleChange}
          >
            <option value="ASISTIO">Asistió</option>
            <option value="AUSENTE">Ausente</option>
            <option value="JUSTIFICADO">Justificado</option>
          </select>
        </div>

        <div className="col-12">
          <label className="form-label">Observación</label>
          <textarea
            name="observacion"
            className="form-control"
            rows="2"
            value={form.observacion || ""}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 mt-3">
          <button className="btn btn-success me-2">Guardar</button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/asistencias")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
