import React from "react";

import { Link } from "react-router-dom";

// Estilos
import "../styles/allJuegos.css";

const CardGames = ({ game }) => {
  return (
    <Link to={game.slug}>
      <div className="m-2">
        <div className="card card__juego">
          {/* Imagen del juego */}
          <img
            src={game.background_image}
            onError={"../assets/images/imagenNoEncontrada.jpg"}
            className="card-img-top imagen_tarjeta"
            alt={game.name}
          ></img>

          <div className="card-body desaparecer_tablet">
            <p className="title_game text-center">{game.name}</p>
          </div>

          {/* 
        <div className="card-body ocultar_en_portatil">
          <p className="title_game text-center">{game.name}</p>
        </div> */}

          {/* Nombre del juego al pasar el ratón por encima de la imagen */}
          <div className="image-hover-text fondo_oscuro">{game.name}</div>
        </div>
      </div>
    </Link>
  );
};

export default CardGames;
