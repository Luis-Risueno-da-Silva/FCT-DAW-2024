// Importar useState y useEffect
import { useState, useEffect } from "react";

// Importar el servicio
import { getProxGame } from "../getProxGame";

// Hook Personalizado
const useProxGame = () => {

    // useState
    const [proxGames, setProxGames] = useState([])

    // Obtener 3 juegos que saldrán en el futuro
    const obtenerJuegosFuturos = () => {

        getProxGame().then(DataJSON => {

            // Setear los juegos futuros 
            setProxGames(DataJSON)

        })

    }

    // Ejecutar "obtenerJuegosFuturos" cuando cargue la página
    useEffect(obtenerJuegosFuturos, [])

    return proxGames

}

export default useProxGame