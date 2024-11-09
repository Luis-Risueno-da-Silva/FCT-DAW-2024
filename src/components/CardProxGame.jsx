import React from "react";

const CardProxGame = ({ proxGame }) => {
  return (
    <div className="col">
      <div className="card card__juego">
        {/* Imagen del juego */}
        <img
          src={proxGame.background_image} onerror={"../assets/images/imagenNoEncontrada.jpg"}
          className="card-img-top"
          alt={proxGame.name}
        ></img>

        {/* La fecha de lanzamiento del juego */}
        <div className="card-body">
          <p className="title_game text-center">{proxGame.name}</p>
          <p className="card-text">
            Fecha de lanzamiento: <strong>{proxGame.released}</strong>
          </p>
        </div>

        {/* Nombre del juego al pasar el ratón por encima de la imagen */}
        <div className="image-hover-text fondo_oscuro">{proxGame.name}</div>
      </div>
    </div>
  );
};

export default CardProxGame;
