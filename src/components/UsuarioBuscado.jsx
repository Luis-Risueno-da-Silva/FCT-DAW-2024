import React from "react";
// Para obtener el nombre del usuario, que saco de la url de la página
import { useParams } from "react-router-dom";
// Manejar el buscador de usuarios
import useFormBuscarUsuario from "../services/hooks/useFormBuscarUsuario";
// Hooks personalizados
import useUsuarioBuscado from "../services/hooks/useUsuarioBuscado";
import useGamesPerfil from "../services/hooks/useGamesPerfil";
// Componentes
import OneJuegoUsuarioBuscado from "./OneJuegoUsuarioBuscado";
import Footer from "./Footer";

const UsuarioBuscado = () => {
  const { errors, errorPersonalizado } = useFormBuscarUsuario();
  const params = useParams();

  // Obtener el nombre del usuario de la URL (el Slug)
  const slug = params.slug;

  // Obtener el nombre de usuario almacenado en localStorage
  const datosUsuario = JSON.parse(localStorage.getItem("datosUsuario")) || null;
  const nombreUsuario = datosUsuario.nombre;

  // Redirigir al perfil del usuario actual si el slug coincide con el nombre del usuario
  if (slug === nombreUsuario) {
    window.location.href = "/usuario";
  }

  const {
    existeUsuario,
    idUsuario,
    puedeVerActividad,
  } = useUsuarioBuscado(slug);

  let arrayEstados = ["terminado", "jugando", "planeado jugar", "abandonado"];

  let existenJuegos;

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

  return (
    <div className="w-100">
      <div className="container_tabla">
        {/* Si el usuario buscado no permite que vean su actividad */}
        {existeUsuario && !puedeVerActividad && (
          <div className="alert alert-danger text-center" role="alert">
            El baúl del usuario buscado es privado
          </div>
        )}

        {/* Si no existe ningún juego en el perfil del usuario */}
        {!existenJuegos && !errors && puedeVerActividad && (
          <div className="alert alert-danger text-center" role="alert">
            El usuario buscado no tiene juegos en su baúl
          </div>
        )}

        {/* Si no existe el usuario */}
        {!existeUsuario && (
          <div className="alert alert-danger text-center" role="alert">
            El usuario buscado no existe
          </div>
        )}

        {/* Si existen juegos en el perfil del usuario buscado */}
        {existeUsuario && existenJuegos && puedeVerActividad && (
          <h1 className="text-center title">Baúl de {slug}</h1>
        )}

        {/* Juegos que el usuario terminó */}
        {existenJuegosTerminados && puedeVerActividad && (
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
              </tr>
            </thead>
            {/* Fin de la cabecera de la tabla */}
            {/* Cuerpo de la página */}
            <tbody>
              {arrayJuegosTerminados.map((juegoPerfilBuscado) => (
                <OneJuegoUsuarioBuscado
                  id={juegoPerfilBuscado.id_juego}
                  key={juegoPerfilBuscado.id_juego}
                  juegoPerfilBuscado={juegoPerfilBuscado}
                />
              ))}
            </tbody>
            {/* Fin del cuerpo de la tabla */}
          </table>
        )}

        {/* Juegos que el usuario está jugando ahora mismo */}
        {existenJuegosJugando && puedeVerActividad && (
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
              </tr>
            </thead>
            {/* Fin de la cabecera de la tabla */}
            {/* Cuerpo de la página */}
            <tbody>
              {arrayJuegosJugando.map((juegoPerfilBuscado) => (
                <OneJuegoUsuarioBuscado
                  id={juegoPerfilBuscado.id_juego}
                  key={juegoPerfilBuscado.id_juego}
                  juegoPerfilBuscado={juegoPerfilBuscado}
                />
              ))}
            </tbody>
            {/* Fin del cuerpo de la tabla */}
          </table>
        )}

        {existenJuegosPlaneadosJugar && puedeVerActividad && (
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
              </tr>
            </thead>
            {/* Fin de la cabecera de la tabla */}
            {/* Cuerpo de la página */}
            <tbody>
              {arrayJuegosPlaneadosJugar.map((juegoPerfilBuscado) => (
                <OneJuegoUsuarioBuscado
                  id={juegoPerfilBuscado.id_juego}
                  key={juegoPerfilBuscado.id_juego}
                  juegoPerfilBuscado={juegoPerfilBuscado}
                />
              ))}
            </tbody>
            {/* Fin del cuerpo de la tabla */}
          </table>
        )}

        {/* Juegos que el usuario abandonó */}
        {existenJuegosAbandonados && puedeVerActividad && (
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
              </tr>
            </thead>
            {/* Fin de la cabecera de la tabla */}
            {/* Cuerpo de la página */}
            <tbody>
              {arrayJuegosAbandonados.map((juegoPerfilBuscado) => (
                <OneJuegoUsuarioBuscado
                  id={juegoPerfilBuscado.id_juego}
                  key={juegoPerfilBuscado.id_juego}
                  juegoPerfilBuscado={juegoPerfilBuscado}
                />
              ))}
            </tbody>
            {/* Fin del cuerpo de la tabla */}
          </table>
        )}
      </div>
      {existenJuegos && puedeVerActividad && <Footer />}
    </div>
  );
};

export default UsuarioBuscado;
