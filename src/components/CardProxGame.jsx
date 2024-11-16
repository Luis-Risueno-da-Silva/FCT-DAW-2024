import React from "react";

// Cuando no hay imagen
import imagenNoEncontrada from "../assets/images/imagenNoEncontrada.jpg";

const CardProxGame = ({ proxGame }) => {
  // Todos los tags del juego
  let tags = proxGame.tags;
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
    <div className="col">
      <div className="card card__juego">
        {/* Imagen del juego */}
        {!censurar ? (
          <img
            src={proxGame.background_image}
            onerror={imagenNoEncontrada}
            className="card-img-top"
            alt={proxGame.name}
          ></img>
        ) : (
          <img
            src={imagenNoEncontrada}
            onerror={imagenNoEncontrada}
            className="card-img-top"
            alt={proxGame.name}
          ></img>
        )}

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
