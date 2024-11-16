// Importar useState y useEffect
import { useState, useEffect } from "react";

// Importar el servicio
import obtenerJuegosPerfil from "../../queries/obtenerJuegosPerfil";

// Hook Personalizado
const useGamesPerfil = (idUsuario) => {
  // useState
  const [gamesPerfil, setGamesPerfil] = useState([]);

  // Obtener los juegos del usuario
  const obtenerJuegosPerfilUsuario = () => {
    // Para enviar el id del usuario como parámetro
    let formDataId = new FormData();
    formDataId.append("id_usuario", idUsuario);

    // Obtener los juegos del perfil
    obtenerJuegosPerfil(formDataId).then(dataJuegos => {
        setGamesPerfil(dataJuegos)
    })

  };

  // Ejecutar función cuando "idUsuario" se modifique   
  useEffect(obtenerJuegosPerfilUsuario, [idUsuario]);

  return gamesPerfil;
};

export default useGamesPerfil;
