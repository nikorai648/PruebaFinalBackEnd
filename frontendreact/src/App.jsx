import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import TrabajadorListPage from "./pages/TrabajadorListPage";
import TrabajadorFormPage from "./pages/TrabajadorFormPage";
import AsistenciaListPage from "./pages/AsistenciaListPage";
import AsistenciaFormPage from "./pages/AsistenciaFormPage";

export const AuthContext = React.createContext(null);

export default function App() {
  // 👇 Estado inicial leyendo desde localStorage
  const [auth, setAuth] = useState({
    isAuthenticated: !!localStorage.getItem("token"),
    token: localStorage.getItem("token"),
    username: localStorage.getItem("username"),
  });

  const login = (token, username) => {
    // Guardar en memoria
    setAuth({
      isAuthenticated: true,
      token,
      username,
    });

    // 👇 Guardar en localStorage (lo que usa getAuthHeaders)
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      token: null,
      username: null,
    });

    // 👇 Limpiar localStorage
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

        {/* CREAR */}
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

        {/* EDITAR */}
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
      </Routes>
    </AuthContext.Provider>
  );
}

{/* LISTA ASISTENCIAS */}
<Route
  path="/asistencias"
  element={
    auth.isAuthenticated ? <AsistenciaListPage /> : <Navigate to="/login" />
  }
/>

{/* CREAR ASISTENCIA */}
<Route
  path="/asistencias/nueva"
  element={
    auth.isAuthenticated ? <AsistenciaFormPage /> : <Navigate to="/login" />
  }
/>

{/* EDITAR ASISTENCIA */}
<Route
  path="/asistencias/:id"
  element={
    auth.isAuthenticated ? <AsistenciaFormPage /> : <Navigate to="/login" />
  }
/>