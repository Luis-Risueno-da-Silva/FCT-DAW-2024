import React from "react";

// Importar useState
import { useState } from "react";

// Importr Outlet
import { Outlet } from "react-router-dom";

// Estilos css
import "../styles/juegos.css";

// Footer de la página
import Footer from "./Footer";

const Juegos = () => {

  // usetate con el que consigo el texto del search
  const [searchText, setSearchText] = useState("");

  // Cuando hago click sobre el botón "Buscar"
  const handleButtonClick = () => {
    /*
    * trim() --> Quitar los espacios al inicio y al final
    * toLowerCase() --> Poner el texto en minúscula
    * replace() --> Remplazo los pesacios por guiones (-)
    */ 
    const formattedText = searchText.trim().toLowerCase().replace(/\s+/g, "-");
    
    // console.log(formattedText)

    // Actualizo la URL de la página
    window.location.href = "/juegos/"+formattedText
  };

  return (
    <div className="div_juegos">
      {/* Título de la página y un buscador de juegos */}
      <div className="titulo_buscador">
        <div>
            <h1 className="ms-3 titulo">Baúl de juegos</h1>
        </div>

        {/* Para buscar juegos */}
        <form className="d-flex me-3">
          <input
            className="form-control me-2 buscador"
            type="search"
            placeholder="Videojuego..."
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="btn btn-success btn_buscar" 
            type="button" onClick={handleButtonClick}>
            Buscar
          </button>
        </form>
      </div>
      {/* Fin del título de la página y el buscador de juegos */}

      <Outlet />

      <div className="w-100">
        <Footer />
      </div>

    </div>
  );
};

export default Juegos;
