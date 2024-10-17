import React from "react";

// Estilos 
import "../styles/inicio.css";
import "../styles/cards.css"

// Importar hook personalizado
import usePopularGames from "../services/hooks/usePopularGames.js"
import useProxGame from "../services/hooks/useProxGame.js";

// Importar tarjeta de juego popular
import CardPopGame from "./CardPopGame.jsx";

// Importar tarjeta de juego próximo
import CardProxGame from "./CardProxGame.jsx";

// El footer de la página
import Footer from "./Footer.jsx";

const Inicio = () => {

  // Obtener los 5 juegos más populares
  let popGames = usePopularGames();

  // Si no se obtiene ningún resultado, devuelve un array vacío
  let popGamesResults = popGames?.results || [];

  console.log(popGamesResults)

  // Obtener 3 juegos que saldrán en el futuro
  let proxGames = useProxGame();

  // Si no se obtiene ningún resultado, devuelve un array vacío
  let proxGamesResults = proxGames?.results || [];

  console.log(proxGamesResults)

  return (
    <div>
      <h1 className="title mt-5">Baúl de juegos</h1>
      <h2 className="subtitle mt-2">Almacena recuerdos de tus juegos</h2>

      {/* Los juegos más populares del último año */}

      <p className="text-center mt-5 fs-3">Los juegos con mejor rating del último año</p>

      <div className="container d-flex justify-content-center mt-1">
        <div className="row row-cols-2 row-cols-lg-5 g-4 justify-content-center">

          {/* Las tarjetas de los juegos populares */}
          {popGamesResults.map((popGame) => 
                <CardPopGame key={popGame.id} popGame={popGame} />
            )}

        </div>
      </div>

      {/* Fin de los juegos más populares del momento */}

      {/* *************************************************** */}

      {/* Juegos que saldrán proximamente */}

      <p className="text-center mt-5 fs-3">Próximos lanzamientos</p>

      <div className="container d-flex justify-content-center mt-1 mb-4">
        <div className="row row-cols-1 row-cols-lg-3 g-4 justify-content-center">

            {/* Las tarjetas de los juegos futuros */}
            {proxGamesResults.map((proxGame) => 
              <CardProxGame key={proxGame.id} proxGame={proxGame} />
            )}

        </div>
      </div>

      {/* Fin de juegos que saldrán proximamente */}

      <Footer />

    </div>
  );
};

export default Inicio;
