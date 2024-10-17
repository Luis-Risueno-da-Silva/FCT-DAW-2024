import { useEffect, useState } from "react";

// Obtener todos los datos de un solo juego
import { getOneGame } from "../getOneGame";

const useOneGame = (slug) => {

    const [game, setGame] = useState({})

    // Obtener datos de un juego
    const obtenerOneGame = () => {

        getOneGame(slug).then(data => {

            // Setear el juego
            setGame(data)

        })

    }

    // Cuando cambia el slug, se busca la información del juego
    useEffect(obtenerOneGame, [slug])

    // Devolver los datos del juego
    return game;

}

export default useOneGame;