import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

export default function Navbar() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">
        Optimizacion y Logistica
      </Link>

      <div className="navbar-nav me-auto">
        <Link className="nav-link" to="/trabajadores">
          Trabajadores
        </Link>
        {/* Más enlaces después: Asistencias, Accidentes, etc. */}
      </div>

      <span className="navbar-text text-white me-3">
        Hola, {auth.username}
      </span>

      <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
        Salir
      </button>
    </nav>
  );
}
