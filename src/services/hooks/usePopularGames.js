// Importar useState y useEffect
import { useState, useEffect } from "react";

// Importar el servicio
import { getPopularGames } from "../getPopularGames";

// Hook Personalizado
const usePopularGames = () => {

    // useState
    const [popularGames, setPopularGames] = useState([])

    // Obtener los 5 juegos más populares
    const obtenerJuegosPopulares = () => {
       
        // Llamar a la función para obtener los juegos populares
        getPopularGames().then(DataJSON => {

            // Setear los juegos populares
            setPopularGames(DataJSON)

        })

    }

    // Ejecutar "obtenerJuegosPopulares" cuando la página cargue
    useEffect(obtenerJuegosPopulares, [])

    // Devolver los juegos populares
    return popularGames

}

// Exportar el hook
export default usePopularGames;