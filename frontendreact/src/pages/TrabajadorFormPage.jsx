import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createTrabajador,
  getTrabajador,
  updateTrabajador,
} from "../api/trabajadores";
const initialForm = {
  rut: "",
  nombre: "",
  apellido: "",
  turno: "DIURNO",
  tipo: "",
};

export default function TrabajadorFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const esEditar = Boolean(id);

  useEffect(() => {
    if (esEditar) {
      getTrabajador(id)
        .then((data) => setForm(data))
        .catch(() => setError("No se pudo cargar el trabajador"));
    }
  }, [id, esEditar]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validar = () => {
    if (!form.rut || !form.nombre || !form.apellido) {
      return "RUT, nombre y apellido son obligatorios.";
    }
    if (form.rut.length < 8) {
      return "RUT demasiado corto.";
    }
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
        await updateTrabajador(id, form);
      } else {
        await createTrabajador(form);
      }
      navigate("/trabajadores");
    } catch (err) {
      setError("Error guardando trabajador");
    }
  };

  return (
    <div className="container mt-4 col-md-6">
      <h3>{esEditar ? "Editar Trabajador" : "Nuevo Trabajador"}</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-12">
          <label className="form-label">RUT</label>
          <input
            name="rut"
            className="form-control"
            value={form.rut}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Nombre</label>
          <input
            name="nombre"
            className="form-control"
            value={form.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Apellido</label>
          <input
            name="apellido"
            className="form-control"
            value={form.apellido}
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
          <label className="form-label">Tipo (cargo + contrato)</label>
          <input
            name="tipo"
            className="form-control"
            placeholder="Operario - INDEFINIDO"
            value={form.tipo}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 mt-3">
          <button className="btn btn-success me-2">Guardar</button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/trabajadores")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
