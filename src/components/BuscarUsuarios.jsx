import React from "react";

// Importar estilos
import "../styles/BuscarUsuarios.css";

// Importar useState
import { useState } from "react";

// Importar Outlet
import { Outlet } from "react-router-dom";

const BuscarUsuarios = () => {
  // usetate con el que consigo el texto del search
  const [searchText, setSearchText] = useState("");

  // Cuando se hace clic sobre el botón "buscar"
  const handleButtonClick = () => {
    // Actualizo la URL de la página
    window.location.href = "/buscarUsuario/" + searchText.trim().replace(/ /g, '-');
  };

  return (
    <div>
      {/* Título de la página y un buscador de usuarios */}
      <div className="titulo_buscador">
        <div>
          <h1 className="ms-3 titulo">Baúl de juegos</h1>
        </div>

        {/* Para buscar juegos */}
        <form className="d-flex me-3">
          <input
            className="form-control me-2 buscador"
            type="search"
            placeholder="Usuario..."
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="btn btn-success btn_buscar"
            type="button"
            onClick={handleButtonClick}
          >
            Buscar
          </button>
        </form>
      </div>
      {/* Fin del título de la página y el buscador de juegos */}

      <Outlet />
    </div>
  );
};

export default BuscarUsuarios;
