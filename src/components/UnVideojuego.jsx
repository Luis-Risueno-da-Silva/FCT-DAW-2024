import React from "react";

// Para obtener el nombre del juego
import { useParams } from "react-router-dom";

// Hook personalizado
import useOneGame from "../services/hooks/useOneGame";

// Estilos de la página
import "../styles/UnVideojuego.css";

const UnVideojuego = () => {
  let params = useParams();

  // console.log(params)

  let slug = params.slug;

  // console.log("El slug es: "+slug)

  let videojuego = useOneGame(slug);

  console.log(videojuego);

  let ratings = videojuego.ratings || [];

  // console.log(ratings)

  return (
    <div>
      {/* Contenedor del juego */}
      <div className="container_juego mt-2">
        {/* Imagen y rating del juego */}
        <div className="imagen_rating">
          {/* Imagen del juego, en una tarjeta */}
          <div className="card mi_card">
            <img
              src={videojuego.background_image}
              className="card-img-top imagen_tarjeta"
              onerror={"../assets/images/imagenNoEncontrada.jpg"}
            ></img>
          </div>
          {/* Fin de la imagen del juego */}

          {/* Rating */}
          <div className="rating mt-2 mb-2 pt-2 pb-2">
            {/* Nota media del juego */}
            <p className="text-center text-primary">Nota media</p>
            <p className="text-center fs-4 borde_rating">
              {videojuego.rating || "n/a"} / 5
            </p>

            {/* Rating de los jugadores */}
            <p className="text-center text-info">Rating de los jugadores</p>
            <ul className="lista_rating borde_rating pb-2">
              {ratings.map((rating) => (
                <li key={rating.id}>
                  {rating.title.toUpperCase()} --- {rating.count}
                </li>
              ))}
            </ul>

            {/* Nota de Metacritic */}
            <p className="text-center text-warning">Metacritic</p>
            <p className="text-center">
              <a
                className="enlace_metacritic p-3"
                href={videojuego.metacritic_url || "#"}
                target="_blank"
              >
                {videojuego.metacritic || "n/a"}
              </a>
            </p>
          </div>
          {/* Fin del rating */}
        </div>
        {/* Fin de la imagen y del rating del juego */}

        {/* Información del juego */}
        <div className="info_juego">
          <p className="fs-2 text-center">{videojuego.name}</p>
        </div>
        {/* Fin de la información del juego */}
      </div>
      {/* Fin del contenedor del juego */}
    </div>
  );
};

export default UnVideojuego;
