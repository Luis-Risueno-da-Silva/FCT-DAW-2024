import React from "react";

// Estilos css
import "../styles/cards.css";
import "../styles/allJuegos.css";

// Importar tarjetas de los juegos
import CardGames from "./CardGames";

// Importar hook personalizado
import useGames from "../services/hooks/useGames";

const AllJuegos = () => {
  let { games, paginas, page, irAPagina } = useGames();

  let gamesResults = games?.results || [];

  console.log(gamesResults);

  return (
    <div>
      {/* Contenedor de 20 juegos */}
      <div className="w-100">
        <div className="grid-container">
          {/* Las tarjetas de los juegos */}
          {gamesResults.map((game) => (
            <CardGames key={game.id} game={game} />
          ))}
        </div>
      </div>

      {/* Indicar en qué página se encuentra el usuario */}
      {page !== null && (
        <p className="text-center mb-2 mt-5">Página de búsqueda: {page}</p>
      )}

      {/* Contenedor de botones para cambiar de página */}
      <div className="botones__container mt-2 mb-2">
        {/* Mostrar los botones para ir a las páginas */}
        {paginas.map((pagina) => (
          <a
            className="boton__pagina"
            key={pagina}
            onClick={() => irAPagina(pagina)}
          >
            {pagina}
          </a>
        ))}

      </div>
      {/* Fin del contenedor de botones */}
      
    </div>
  );
};

export default AllJuegos;
