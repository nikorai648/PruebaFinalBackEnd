import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="container mt-4">
      <div className="p-4 bg-light rounded-3">
        <h1 className="h4 mb-2">Opciones del Sistema</h1>
        <p className="mb-4">Sistema de Trabajadores, Asistencias y Accidentes.</p>
        <div className="d-flex gap-2 flex-wrap">
          <Link className="btn btn-primary" to="/trabajadores">
            Trabajadores
          </Link>
          {/* Aquí luego puedes agregar los otros botones: Asistencias, Accidentes, etc. */}
        </div>
      </div>
    </div>
  );
}
