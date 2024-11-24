// Importar useState y useEffect
import { useState, useEffect } from "react";

// Importar el servicio
import obtenerJuegosPerfil from "../../queries/obtenerJuegosPerfil";

// Hook Personalizado
const useGamesPerfil = (idUsuario, estado) => {
  // useState
  const [gamesPerfil, setGamesPerfil] = useState([]);

  // Obtener los juegos del usuario
  const obtenerJuegosPerfilUsuario = () => {
    // Para enviar el id del usuario como parámetro
    let formData = new FormData();
    formData.append("id_usuario", idUsuario);
    formData.append("estado_juego", estado)

    // Obtener los juegos del perfil
    obtenerJuegosPerfil(formData).then(dataJuegos => {
      setGamesPerfil(dataJuegos)
    })

  };

  // Ejecutar función cuando "idUsuario" se modifique   
  useEffect(obtenerJuegosPerfilUsuario, [idUsuario]);

  return gamesPerfil;
};

export default useGamesPerfil;
