import React from "react";

import { Outlet } from "react-router-dom";

// Estilos css
import "../styles/juegos.css";

const Juegos = () => {
  return (
    <div className="w-100">
      {/* Título de la página y un buscador de juegos */}
      <div className="titulo_buscador w-100">
        <h1 className="ms-3 titulo">Baúl de juegos</h1>

        {/* Para buscar juegos */}
        <form className="d-flex formulario">
          <input
            className="form-control me-2 buscador"
            type="search"
            placeholder="Videojuego"
          />
          <button className="btn btn-outline-success btn_buscar" type="submit">
            Buscar
          </button>
        </form>
      </div>
      {/* Fin del título de la página y el buscador de juegos */}

      <Outlet />

    </div>
  );
};

export default Juegos;
