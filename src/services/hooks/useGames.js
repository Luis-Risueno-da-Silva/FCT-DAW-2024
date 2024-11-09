// Importar useState y useEffect
import { useState, useEffect } from "react";

// Importar el servicio
import { getGames } from "../getGames";

// Hook personalizado
const useGames = (pagina) => {

    const [games, setGames] = useState([]);
    const [page, setPage] = useState(pagina || 1); // Empezamos en la página 1
    const [loading, setLoading] = useState(false);


    const obtenerJuegos = () => {
        setLoading(true); // Activar el estado de carga
        getGames(page).then(DataJSON => {
            setGames(DataJSON);
            setLoading(false); // Desactivar el estado de carga
        });
    };

    // Array del 1 al 10
    const paginas = Array.from({ length: 10 }, (_, i) => i + 1); 


    // Página anterior de resultados
    // No se puede acceder a una página de resultados inferior a 1
    // const prevPage = () => setPage(page => Math.max(page - 1, 1));

    // Página siguiente de juegos
    // const nextPage = () => setPage(page => page + 1);

    const irAPagina = (pagina) => {
        setPage(pagina)
    }

    // Ejecutar "obtenerJuegos" al cargar la página y
    // al cambiar el valor de "page".
    useEffect(obtenerJuegos, [page])

    // Devolver juegos y funciones
    return {games, paginas, page, irAPagina};

}

export default useGames