import React from 'react'

import { Link } from 'react-router-dom'

const CardGames = ({ game }) => {
  return (
    <Link to={game.slug}>
    <div className="m-2">
      <div className="card card__juego">
        {/* Imagen del juego */}
        <img
          src={game.background_image} onerror={"../assets/images/imagenNoEncontrada.jpg"}
          className="card-img-top imagen_tarjeta"
          alt={game.name}
        ></img>

        {/* Nombre del juego al pasar el ratón por encima de la imagen */}
        <div className="image-hover-text fondo_oscuro">{game.name}</div>
      </div>
    </div>
    </Link>
  )
}

export default CardGames