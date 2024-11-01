import React from "react";

// Para obtener el nombre del juego
import { useParams } from "react-router-dom";

// Hook personalizado
import useOneGame from "../services/hooks/useOneGame";

// Estilos de la página
import "../styles/UnVideojuego.css";

// Estas funciones las utilizo para acortar la descripción
// y mostrar la parte en español (si existe)
import acortarDescripcionEspañola from "../js/acortarDescripcionEspañola";

const UnVideojuego = () => {

  let params = useParams();

  // console.log(params)

  let slug = params.slug;

  // console.log("El slug es: "+slug)

  let videojuego = useOneGame(slug);

  console.log(videojuego);

  /*
   * Ratings del juego:
   * Excepcional
   * Recomendado
   * Meh
   * Saltear (no recomendado)
   */
  let ratings = videojuego.ratings || [];

  // console.log(ratings)

  // Calificación por edades (ESRB)
  let calificacionEdades = videojuego.esrb_rating || "";

  // console.log(calificacionEdades.name)

  // Publishers del videojuego
  let publishers = videojuego.publishers || [];

  // console.log(publishers);

  // Descripción del juego
  let descripcion = videojuego.description_raw || "Descripción no disponible";

  // console.log(descripcion)

  // Descripción en español del juego
  let descripcionEspañola = acortarDescripcionEspañola(descripcion, "Español");

  // console.log(descripcionEspañola)

  // Plataformas en las que ha salido el juego
  let plataformas = videojuego.platforms || [];

  // console.log(plataformas);

  // Géneros del juego
  let generos = videojuego.genres || [];

  // console.log(generos);

  // Para poner los ratings en español
  let ratingsEspañol = ["Excepcional", "Recomendado", "Meh", "No jugar"];
  let index = 0;

  // Para poner las calificaciones por edades en formato de PEGI
  let calificacionEdadesEspañol = [
    "PEGI 3",
    "PEGI 7",
    "PEGI 7",
    "PEGI 12",
    "PEGI 18",
    "PEGI 18",
    "PEGI no disponible",
  ];

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
            <ul className="lista_sin_estilo borde_rating pb-2">
              {ratings.map((rating) => (
                <li key={rating.id}>
                  {ratingsEspañol[index]} --- {rating.count}
                  {index++}
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
          {/* Nombre del videojuego */}
          <p className="fs-2 text-center text-primary">
            <strong>{videojuego.name || "El videojuego no existe"}</strong>
          </p>
          {/* Rating según la ESRB */}
          <p className="text-center">
            Calificación por edades:{" "}
            <strong>
              {calificacionEdadesEspañol[calificacionEdades.id] ||
                "PEGI no disponible"}
            </strong>
          </p>
          {/* Fecha de lanzamiento y publishers del videojuego */}
          <p className="text-center">
            Fecha de lanzamiento:{" "}
            <strong>{videojuego.released || "n/a"}</strong> Publishers: &nbsp;
            {publishers.map((publisher) => (
              <strong key={publisher.id}>{publisher.name}. </strong>
            ))}
          </p>
          {/* Descripción del videojuego */}
          <p className="descripcion">
            {descripcionEspañola || videojuego.description_raw}
          </p>

          <hr />

          {/* Plataformas en las que ha salido el juego y géneros */}
          <div className="div_plataformas_generos">
            {/* Plataformas en las que el videojuego está */}
            <div className="div_plataformas">
              <p className="text-center text-primary">Lanzado en: </p>
              {plataformas.map((plataforma) => (
                <p key={plataforma.platform.id} className="text-center">
                  {plataforma.platform.name}
                </p>
              ))}
            </div>
            {/* Fin de las plataformas en las que el juego se encuentra */}

            {/* Géneros del juego */}
            <div className="div_generos">
              <p className="text-center text-primary">Géneros:</p>
              {generos.map((genero) => (
                <p key={genero.id} className="text-center">
                  {genero.name}
                </p>
              ))}
            </div>
            {/* Fin de los géneros del juego */}
          </div>
        </div>
        {/* Fin de la información del juego */}
      </div>
      {/* Fin del contenedor del juego */}
    </div>
  );
};

export default UnVideojuego;
