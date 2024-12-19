import React from "react";

// Importar Link
import { Link } from "react-router-dom";

// Importar los estilos del menú
import "../styles/menu.css";

// js
import comprobarLocalStorage from "../js/comprobarLocalStorage";
import cerrarSesion from "../js/cerrarSesion";

import "../js/menuResponsivo.js";

const Menu = () => {
  // Comprobar que haya una sesión iniciada
  let dataLocalStorage = comprobarLocalStorage();
  // console.log(dataLocalStorage);

  return (
    <div>
      {/* Navegador de la página */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {/* Para ir al Home */}
              <li className="nav-item me-5">
                <Link to={"/"} className="nav_item_style">
                  Inicio
                </Link>
              </li>

              {/* Para ir a Juegos */}
              <li className="nav-item me-5">
                <Link to={"/juegos"} className="nav_item_style">
                  Juegos
                </Link>
              </li>

              {dataLocalStorage ? (
                <li className="nav-item">
                  {/* Para ir a Buscar Usuarios */}
                  <Link to={"/buscarUsuario"} className="nav_item_style me-5">
                    Buscar Usuario
                  </Link>

                  <br className="ocultar" />

                  {/* Para ir al perfil del usuario */}
                  <Link to={"/usuario"} className="nav_item_style me-5">
                    <i className="bi bi-person-fill"></i> {dataLocalStorage}
                  </Link>

                  <br className="ocultar" />

                  {/* Cerrar la sesión actual */}
                  <a className="enlace" onClick={cerrarSesion}>
                    <i className="bi bi-box-arrow-right"></i> Cerrar sesión
                  </a>
                </li>
              ) : (
                <li className="nav-item me-2">
                  {/* Para ir a Iniciar Sesión */}
                  <Link to={"/iniciarSesion"} className="nav_item_style me-5">
                    Iniciar sesión
                  </Link>

                  <br className="ocultar" />

                  {/* Para ir a Registrar Usuarios */}
                  <Link to={"/registrarUsuarios"} className="nav_item_style">
                    Registarse
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
