import React from "react";

// Estilos css
import "../styles/Usuario.css";

// HookPersonalizado
import useIdUsuario from "../services/hooks/useIdUsuario";
import useGamesPerfil from "../services/hooks/useGamesPerfil";

// Componentes
import OneJuegoPerfil from "./OneJuegoPerfil";
import Footer from "./Footer";

const Usuario = () => {
  // Obtener datos del localStorage
  let datosLocalStorage = JSON.parse(localStorage.getItem("datosUsuario"));

  // Obtener el nombre del usuario
  let nombre = datosLocalStorage.nombre;

  let existenJuegos;

  // Obtener el id del usuario
  let idUsuario = useIdUsuario(nombre) || "";
  // console.log(idUsuario);

  let arrayEstados = ["terminado", "jugando", "planeado jugar", "abandonado"];

  // Array de juegos en cada estado disponible
  let arrayJuegosTerminados = [];
  let existenJuegosTerminados = false;

  let arrayJuegosJugando = [];
  let existenJuegosJugando = false;

  let arrayJuegosPlaneadosJugar = [];
  let existenJuegosPlaneadosJugar = false;

  let arrayJuegosAbandonados = [];
  let existenJuegosAbandonados = false;

  // Obtener juegos de todos los estados disponibles
  arrayJuegosTerminados = useGamesPerfil(idUsuario, arrayEstados[0]) || [];
  arrayJuegosJugando = useGamesPerfil(idUsuario, arrayEstados[1]) || [];
  arrayJuegosPlaneadosJugar = useGamesPerfil(idUsuario, arrayEstados[2]) || [];
  arrayJuegosAbandonados = useGamesPerfil(idUsuario, arrayEstados[3]) || [];

  if (arrayJuegosTerminados.length > 0) {
    existenJuegos = true;
    existenJuegosTerminados = true;
  }

  if (arrayJuegosJugando.length > 0) {
    existenJuegos = true;
    existenJuegosJugando = true;
  }

  if (arrayJuegosPlaneadosJugar.length > 0) {
    existenJuegos = true;
    existenJuegosPlaneadosJugar = true;
  }

  if (arrayJuegosAbandonados.length > 0) {
    existenJuegos = true;
    existenJuegosAbandonados = true;
  }

  const salir = () => {
    window.location.href = "/juegos";
  };

  return (
    <div className="w-100">
      <h1 className="text-center title">Mi baúl de videojuegos</h1>

      {/* Contenedor de los juegos del perfil */}
      <div className="container_tabla">
        {/* Si no existe ningún juego en el perfil del usuario */}
        {!existenJuegos && (
          <div className="alert alert-danger text-center" role="alert">
            Aún no hay juegos en tu baúl, haz clic{" "}
            <a className="alert-link alert-link_style" onClick={salir}>
              aquí
            </a>{" "}
            para buscar juegos
          </div>
        )}
        {/* Juegos que el usuario terminó */}
        {existenJuegosTerminados && (
          // Inicio de la tabla
          <table className="table me-3">
            {/* Cabecera de la tabla */}
            <thead className="text-center">
              <tr>
                <th className="fs-4 text-primary" colSpan={5}>
                  Juegos Terminados
                </th>
              </tr>
              <tr>
                <th scope="col">Título</th>
                <th scope="col">Estado</th>
                <th scope="col">Puntuación</th>
                <th scope="col">Modificar</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            {/* Fin de la cabecera de la tabla */}
            {/* Cuerpo de la página */}
            <tbody>
              {arrayJuegosTerminados.map((juegoPerfil) => (
                <OneJuegoPerfil
                  id={juegoPerfil.id_juego}
                  juegoPerfil={juegoPerfil}
                />
              ))}
            </tbody>
            {/* Fin del cuerpo de la tabla */}
          </table>
        )}
        {/* Juegos que el usuario está jugando en ese momento */}
        {existenJuegosJugando && (
          // Inicio de la tabla
          <table className="table me-3">
            {/* Cabecera de la tabla */}
            <thead className="text-center">
              <tr>
                <th className="fs-4 text-primary" colSpan={5}>
                  Jugando
                </th>
              </tr>
              <tr>
                <th scope="col">Título</th>
                <th scope="col">Estado</th>
                <th scope="col">Puntuación</th>
                <th scope="col">Modificar</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            {/* Fin de la cabecera de la tabla */}
            {/* Cuerpo de la página */}
            <tbody>
              {arrayJuegosJugando.map((juegoPerfil) => (
                <OneJuegoPerfil
                  id={juegoPerfil.id_juego}
                  juegoPerfil={juegoPerfil}
                />
              ))}
            </tbody>
            {/* Fin del cuerpo de la tabla */}
          </table>
        )}
        {existenJuegosPlaneadosJugar && (
          // Inicio de la tabla
          <table className="table me-3">
            {/* Cabecera de la tabla */}
            <thead className="text-center">
              <tr>
                <th className="fs-4 text-primary" colSpan={5}>
                  Planeado Jugar
                </th>
              </tr>
              <tr>
                <th scope="col">Título</th>
                <th scope="col">Estado</th>
                <th scope="col">Puntuación</th>
                <th scope="col">Modificar</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            {/* Fin de la cabecera de la tabla */}
            {/* Cuerpo de la página */}
            <tbody>
              {arrayJuegosPlaneadosJugar.map((juegoPerfil) => (
                <OneJuegoPerfil
                  id={juegoPerfil.id_juego}
                  juegoPerfil={juegoPerfil}
                />
              ))}
            </tbody>
            {/* Fin del cuerpo de la tabla */}
          </table>
        )}
        {existenJuegosAbandonados && (
          // Inicio de la tabla
          <table className="table me-3">
            {/* Cabecera de la tabla */}
            <thead className="text-center">
              <tr>
                <th className="fs-4 text-primary" colSpan={5}>
                  Juegos abandonados
                </th>
              </tr>
              <tr>
                <th scope="col">Título</th>
                <th scope="col">Estado</th>
                <th scope="col">Puntuación</th>
                <th scope="col">Modificar</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            {/* Fin de la cabecera de la tabla */}
            {/* Cuerpo de la página */}
            <tbody>
              {arrayJuegosAbandonados.map((juegoPerfil) => (
                <OneJuegoPerfil
                  id={juegoPerfil.id_juego}
                  juegoPerfil={juegoPerfil}
                />
              ))}
            </tbody>
            {/* Fin del cuerpo de la tabla */}
          </table>
        )}
      </div>
      {/* Fin del contenedor de los juegos del perfil */}

      {existenJuegos && 
        <Footer />
      }
      
    </div>
  );
};

export default Usuario;
