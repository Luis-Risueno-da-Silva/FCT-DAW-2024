import React from "react";

const CardPopGame = ({ popGame }) => {
  return (
    <div className="col m-2">
      <div className="card card__juego">
        {/* Imagen del juego */}
        <img
          src={popGame.background_image} onerror={"../assets/images/imagenNoEncontrada.jpg"}
          className="card-img-top"
          alt={popGame.name}
        ></img>

        {/* Rating del juego */}
        <div className="card-body">
          <p className="card-text centrar">
            Rating: <strong>{popGame.rating}/5</strong>
          </p>
        </div>

        {/* Nombre del juego al pasar el ratón por encima de la imagen */}
        <div className="image-hover-text fondo_oscuro">{popGame.name}</div>
      </div>
    </div>
  );
};

export default CardPopGame;
