import React from "react";

// Estilos css
import "../styles/Usuario.css";

// HookPersonalizado
import useIdUsuario from "../services/hooks/useIdUsuario";
import useGamesPerfil from "../services/hooks/useGamesPerfil";

// Componentes
import OneJuegoPerfil from "./OneJuegoPerfil";

const Usuario = () => {
  // Obtener datos del localStorage
  let datosLocalStorage = JSON.parse(localStorage.getItem("datosUsuario"));

  // Obtener el nombre del usuario
  let nombre = datosLocalStorage.nombre;

  // Obtener el id del usuario
  let idUsuario = useIdUsuario(nombre) || "";
  console.log(idUsuario);

  // Obtener los juegos que el usuario tiene en el perfil
  let arrayJuegosPerfil = useGamesPerfil(idUsuario) || [];
  console.log(arrayJuegosPerfil);

  let existenJuegos;

  if (arrayJuegosPerfil != []) {
    existenJuegos = true;
  } else {
    existenJuegos = false;
  }

  return (
    <div>
      <h1 className="text-center title">Tu lista de videojuegos</h1>

      {/* Contenedor de los juegos del perfil */}
      <div className="container_tabla">
        {/* Inicio de la tabla */}
        <table className="table">
          {/* Cabecera de la tabla */}
          <thead className="text-center">
            <tr>
              <th scope="col">Título</th>
              <th scope="col">Puntuación</th>
              <th scope="col">Modificar</th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          {/* Fin de la cabecera de la tabla */}
          {/* Cuerpo de la tabla */}
          <tbody>
            {arrayJuegosPerfil.map((juegoPerfil) => 
              <OneJuegoPerfil key={juegoPerfil.id_juego} juegoPerfil={juegoPerfil}/>
            )}
          </tbody>
          {/* Fin del cuerpo de la tabla */}
        </table>
        {/* Final de la tabla */}
      </div>
      {/* Fin del contenedor de los juegos del perfil */}
    </div>
  );
};

export default Usuario;
