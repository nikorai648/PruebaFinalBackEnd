// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import TrabajadorListPage from "./pages/TrabajadorListPage";
import TrabajadorFormPage from "./pages/TrabajadorFormPage";
import AsistenciaListPage from "./pages/AsistenciaListPage";
import AsistenciaFormPage from "./pages/AsistenciaFormPage";
import AccidenteListPage from "./pages/AccidenteListPage";
import AccidenteFormPage from "./pages/AccidenteFormPage";

export const AuthContext = React.createContext(null);

export default function App() {
  // Estado inicial leyendo desde localStorage
  const [auth, setAuth] = useState({
    isAuthenticated: !!localStorage.getItem("token"),
    token: localStorage.getItem("token"),
    username: localStorage.getItem("username"),
  });

  const login = (token, username) => {
    setAuth({
      isAuthenticated: true,
      token,
      username,
    });

    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      token: null,
      username: null,
    });

    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {auth.isAuthenticated && <Navbar />}

      <Routes>
        {/* LOGIN */}
        <Route path="/login" element={<LoginPage />} />

        {/* HOME */}
        <Route
          path="/"
          element={
            auth.isAuthenticated ? <HomePage /> : <Navigate to="/login" />
          }
        />

        {/* LISTA TRABAJADORES */}
        <Route
          path="/trabajadores"
          element={
            auth.isAuthenticated ? (
              <TrabajadorListPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* CREAR TRABAJADOR */}
        <Route
          path="/trabajadores/nuevo"
          element={
            auth.isAuthenticated ? (
              <TrabajadorFormPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* EDITAR TRABAJADOR */}
        <Route
          path="/trabajadores/:id"
          element={
            auth.isAuthenticated ? (
              <TrabajadorFormPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* LISTA ASISTENCIAS */}
        <Route
          path="/asistencias"
          element={
            auth.isAuthenticated ? (
              <AsistenciaListPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* CREAR ASISTENCIA */}
        <Route
          path="/asistencias/nueva"
          element={
            auth.isAuthenticated ? (
              <AsistenciaFormPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* EDITAR ASISTENCIA */}
        <Route
          path="/asistencias/:id"
          element={
            auth.isAuthenticated ? (
              <AsistenciaFormPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </AuthContext.Provider>
  );
}

{/* LISTA ACCIDENTES */}
<Route
  path="/accidentes"
  element={
    auth.isAuthenticated ? <AccidenteListPage /> : <Navigate to="/login" />
  }
/>

{/* CREAR ACCIDENTE */}
<Route
  path="/accidentes/nuevo"
  element={
    auth.isAuthenticated ? <AccidenteFormPage /> : <Navigate to="/login" />
  }
/>

{/* EDITAR ACCIDENTE */}
<Route
  path="/accidentes/:id"
  element={
    auth.isAuthenticated ? <AccidenteFormPage /> : <Navigate to="/login" />
  }
/>