import React from "react";

// Cuando no hay imagen
import imagenNoEncontrada from "../assets/images/imagenNoEncontrada.jpg";

const CardPopGame = ({ popGame }) => {
  // Todos los tags del juego
  let tags = popGame.tags;
  // console.log(tags)

  // Tags que vaneo
  let tagsBaneados = ["nsfw", "hentai", "erotic"];

  // Se censura la imagen o no
  let censurar;

  for (let i = 0; i < tags.length; i++) {
    for (let j = 0; j < tagsBaneados.length; j++) {
      if (tagsBaneados[j] == tags[i].slug) {
        censurar = true;
      }
    }
  }

  return (
    <div className="col m-2">
      <div className="card card__juego">
        {/* Imagen del juego */}
        {!censurar ? (
          <img
            src={popGame.background_image}
            onerror={imagenNoEncontrada}
            className="card-img-top"
            alt={popGame.name}
          ></img>
        ) : (
          <img
            src={imagenNoEncontrada}
            onerror={imagenNoEncontrada}
            className="card-img-top"
            alt={popGame.name}
          ></img>
        )}

        {/* Rating del juego */}
        <div className="card-body">
          <p className="title_game text-center">{popGame.name}</p>
          <p className="card-text centrar text-center">
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
