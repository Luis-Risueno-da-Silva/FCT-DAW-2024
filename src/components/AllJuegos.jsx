import React from "react";

// Estilos css
import "../styles/cards.css";

// Importar tarjetas de los juegos
import CardGames from "./CardGames";

// Importar hook personalizado
import useGames from "../services/hooks/useGames";

const AllJuegos = () => {
  let { games, prevPage, nextPage, loading } = useGames();

  let gamesResults = games?.results || [];

  console.log(gamesResults);

  return (
    <div>
      {/* Contenedor de 20 juegos */}
      <div>
        <div className="juegos_container">
          {/* Las tarjetas de los juegos */}
          {gamesResults.map((game) => (
            <CardGames key={game.id} game={game} />
          ))}
        </div>
      </div>

      {/* Contenedor de botones para cambiar de página */}
      <div className="d-flex justify-content-between botones__container mt-4 mb-4">
        <button
          type="button"
          className="btn btn-primary"
          onClick={prevPage}
          disabled={loading}
        >
          Anterior
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={nextPage}
          disabled={loading}
        >
          Siguiente
        </button>
      </div>
      {/* Fin del contenedor de botones */}
    </div>
  );
};

export default AllJuegos;
