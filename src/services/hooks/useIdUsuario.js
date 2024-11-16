// Importar useState y useEffect
import { useState, useEffect } from "react";

// Importar el servicio
import obtenerIdUsuario from "../../queries/obtenerIdUsuario";

const useIdUsuario = (name) => {
    // Estado para almacenar el ID de usuario
    const [idUsuario, setIdUsuario] = useState(null);

    // Función para obtener el ID del usuario
    const conseguirIdUsuario = () => {
        // Para enviar el nombre del usuario como parámetro
        let formDataNombre = new FormData();
        formDataNombre.append("nombre", name);

        // Obtener el id del usuario
        obtenerIdUsuario(formDataNombre).then(data => {
            setIdUsuario(data.id);
        })
    };

    // Ejecutar función cuando "name" se modifique
    useEffect(conseguirIdUsuario, [name])

    return idUsuario;
};

export default useIdUsuario;
