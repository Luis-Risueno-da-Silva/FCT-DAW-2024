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
    // Cuando se está cargando la consulta, los botones están desactivados.
    // Cuando la consulta se ha cargado, los botones vuelven a activarse.


    // Página anterior de resultados
    // No se puede acceder a una página de resultados inferior a 1
    const prevPage = () => setPage(page => Math.max(page - 1, 1));

    // Página siguiente de juegos
    const nextPage = () => setPage(page => page + 1);

    // Ejecutar "obtenerJuegos" al cargar la página y
    // al cambiar el valor de "page".
    useEffect(obtenerJuegos, [page])

    // Devolver juegos y funciones
    return {games, prevPage, nextPage, loading};

}

export default useGames