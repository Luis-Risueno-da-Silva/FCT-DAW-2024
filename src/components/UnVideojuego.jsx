import React, { useState } from "react";

// Para obtener el nombre del juego
import { useParams } from "react-router-dom";

// Hook personalizado
import useOneGame from "../services/hooks/useOneGame";

// Estilos de la página
import "../styles/UnVideojuego.css";

// Funciones js
import acortarDescripcionEspañola from "../js/acortarDescripcionEspañola";
import comprobarLocalStorage from "../js/comprobarLocalStorage";

// Funciones del formulario
import useFormModal from "../services/hooks/useFormModal";

// Consultas
import obtenerIdUsuario from "../queries/obtenerIdUsuario";
import añadirJuegoAlPerfil from "../queries/añadirJuegoAlPerfil";
import verificarJuegoPerfil from "../queries/verificarJuegoPerfil";
import modificarJuegoPerfil from "../queries/modificarJuegoPerfil";

const UnVideojuego = () => {
  const { handleSubmit, errors, handleErrors, errorPersonalizado } =
    useFormModal();

  let params = useParams();

  // console.log(params)

  let slug = params.slug;

  // console.log("El slug es: "+slug)

  let videojuego = useOneGame(slug);

  // console.log(videojuego);

  /*
   * Ratings del juego:
   * Excepcional
   * Recomendado
   * Meh
   * Saltear (no recomendado)
   */
  let ratings = videojuego.ratings || [];

  // console.log(ratings)

  // Calificación por edades (ESRB)
  let calificacionEdades = videojuego.esrb_rating || "";

  // console.log(calificacionEdades.name)

  // Publishers del videojuego
  let publishers = videojuego.publishers || [];

  // console.log(publishers);

  // Descripción del juego
  let descripcion = videojuego.description_raw || "Descripción no disponible";

  // console.log(descripcion)

  // Descripción en español del juego
  let descripcionEspañola = acortarDescripcionEspañola(descripcion, "Español");

  // console.log(descripcionEspañola)

  // Plataformas en las que ha salido el juego
  let plataformas = videojuego.platforms || [];

  // console.log(plataformas);

  // Géneros del juego
  let generos = videojuego.genres || [];

  // console.log(generos);

  // Para poner los ratings en español
  let ratingsEspañol = ["Excepcional", "Recomendado", "Meh", "No jugar"];
  let index = 0;

  // Para poner las calificaciones por edades en formato de PEGI
  let calificacionEdadesEspañol = [
    "PEGI 3",
    "PEGI 7",
    "PEGI 7",
    "PEGI 12",
    "PEGI 18",
    "PEGI 18",
    "PEGI no disponible",
  ];

  // **********************************************************

  // Comprobar que haya una sesión iniciada
  let dataLocalStorage = comprobarLocalStorage();
  // console.log(dataLocalStorage);

  // ID del usuario
  let idUsuario;

  // El estado del juego con la primera letra en mayúscula
  let estadoJuegoFormateado;

  // Para verificar que el juego exista en el perfil del usuario
  const [existeJuegoEnPerfil, setExisteJuegoEnPerfil] = useState(false);

  // Información del videojuego que se añadirá al perfil del usuario
  const [estadoJuego, setEstadoJuego] = useState();
  const [nota_juego, setNotaJuego] = useState();
  const [reseña, setReseña] = useState();
  const [fecha_inicio, setFechaInicio] = useState();
  const [fecha_fin, setFechaFin] = useState();
  const [veces_jugado, setVecesJugado] = useState();

  // Manejar cambios en el estado del juego
  const handleChangeEstadoJuego = (e) => {
    setEstadoJuego(e.target.value);
  };

  // Manejar cambios en la nota del juego
  const handleChangeNotaJuego = (e) => {
    setNotaJuego(e.target.value);
  };

  // Manejar cambios en la reseña del videojuego
  const handleChangeReseña = (e) => {
    setReseña(e.target.value);
  };

  // Manejar cambios en la fecha de inicio
  const handleChangeFechaInicio = (e) => {
    setFechaInicio(e.target.value);
  };

  // Manejar cambios en la fecha de fin
  const handleChangeFechaFin = (e) => {
    setFechaFin(e.target.value);
  };

  // Manejar cambios en las veces que se ha jugado a un juego
  const handleChangeVecesJugado = (e) => {
    setVecesJugado(e.target.value);
  };

  let fecha = new Date();
  let año = fecha.getFullYear();
  let mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Meses empiezan en 0
  let día = String(fecha.getDate()).padStart(2, "0");
  let fechaFormateada = año + "-" + mes + "-" + día;

  // Comprobar si el juego se encuentra en el perfil del usuario o no
  const comprobarUsuario = async () => {
    // Obtener información del localStorage
    let datosLocalStorage = JSON.parse(localStorage.getItem("datosUsuario"));

    if (datosLocalStorage != null) {
      // Obtener nombre del usuario
      let nombreUsuario = datosLocalStorage.nombre;
      let nombreFormateado = nombreUsuario.trim().replace(/ /g, "-");

      // console.log("El nombre del usuario: " + nombreFormateado);

      // Para hacer la consulta de obtener el id del usuario
      const formDataNombre = new FormData();
      formDataNombre.append("nombre", nombreFormateado);

      // Obtener id del usuario a partir del nombre
      let datosUsuario = await obtenerIdUsuario(formDataNombre);
      idUsuario = datosUsuario.id;

      // console.log("Id de usuario: " + idUsuario);

      if (idUsuario != false && idUsuario != undefined) {
        comprobarJuegoPerfil();
      }
    }
  };

  // Comprobar que el juego ya se encuentre en el perfil del usuario
  const comprobarJuegoPerfil = async () => {
    // Para hacer la consulta de saber si el juego está en el perfil del usuario
    const formDataJuego = new FormData();
    formDataJuego.append("id_usuario", idUsuario);
    formDataJuego.append("id_juego", videojuego.id);

    let respuesta = await verificarJuegoPerfil(formDataJuego);
    console.log(respuesta);

    if (respuesta != false) {
      setExisteJuegoEnPerfil(true);
    }

    setEstadoJuego(respuesta.estado_juego);
    setNotaJuego(respuesta.nota_juego);
    setReseña(respuesta.reseña);
    setFechaInicio(respuesta.fecha_inicio);
    setFechaFin(respuesta.fecha_finalizacion);
    setVecesJugado(respuesta.veces_jugado);
  };

  // Comprobar errores del formulario
  const comprobarErrores = async () => {
    const errores = await handleErrors(
      estadoJuego,
      nota_juego,
      reseña,
      fecha_inicio,
      fecha_fin,
      veces_jugado
    );

    // console.log(errores)

    if (errores == false) {
      enviarFormulario();
    }
  };

  // Enviar el formulario
  const enviarFormulario = () => {
    let datosLocalStorage = JSON.parse(localStorage.getItem("datosUsuario"));
    let nombreUsuario = datosLocalStorage.nombre;
    let nombreFormateado = nombreUsuario.trim().replace(/ /g, "-");

    // console.log("El nombre del usuario: " + nombreUsuario);

    const formDataNombre = new FormData();
    formDataNombre.append("nombre", nombreFormateado);

    // Obtener id del usuario
    const obtenerRespuestaUsuario = async () => {
      let respuesta = await obtenerIdUsuario(formDataNombre);

      // console.log(respuesta)

      if (respuesta != false) {
        idUsuario = respuesta.id;
        // console.log(idUsuario)
        insertarJuegoAlPerfil();
      }
    };

    // Insertar datos en la tabla de Juegos
    const insertarJuegoAlPerfil = async () => {
      const formDataJuego = new FormData();
      formDataJuego.append("id_usuario", idUsuario);
      formDataJuego.append("id_juego", videojuego.id);
      formDataJuego.append("nombre_juego", videojuego.name);
      formDataJuego.append("imagen_juego", videojuego.background_image);
      formDataJuego.append("estado_juego", estadoJuego);
      formDataJuego.append("nota_juego", nota_juego);
      formDataJuego.append("reseña", reseña);
      formDataJuego.append("fecha_inicio", fecha_inicio);
      formDataJuego.append("fecha_finalizacion", fecha_fin);
      formDataJuego.append("veces_jugado", veces_jugado);

      // Respuesta de la consulta de modificación o actualización, según proceda
      let respuesta;

      // Si el videojuego no existe --> INSERT en la tabla "juegos"
      if (videojuegoPerfil == false) {
        // Se espera a que la función termine
        respuesta = await añadirJuegoAlPerfil(formDataJuego);
      } else {
        // Si el videojuego existe --> UPDATE en la tabla "juegos"
        console.log("Se va a proceder a hacer UPDATE");
        respuesta = await modificarJuegoPerfil(formDataJuego);
      }

      if (respuesta == true) {
        // Enviar al usuario a su perfil
        window.location.href = "/usuario";
      } else {
        errorPersonalizado("Error al insertar o modificar");
      }
    };

    obtenerRespuestaUsuario();
  };

  comprobarUsuario();

  return (
    <div>
      {/* Contenedor del juego */}
      <div className="container_juego mt-2">
        {/* Imagen y rating del juego */}
        <div className="imagen_rating">
          {/* Imagen del juego, en una tarjeta */}
          <div className="card mi_card">
            <img
              src={videojuego.background_image}
              className="card-img-top imagen_tarjeta"
              onError={"../assets/images/imagenNoEncontrada.jpg"}
            ></img>
          </div>
          {/* Fin de la imagen del juego */}

          {/* Rating */}
          <div className="rating mt-2 mb-2 pt-2 pb-2">
            {/* Nota media del juego */}
            <p className="text-center text-primary">Nota media</p>
            <p className="text-center fs-4 borde_rating">
              {videojuego.rating || "n/a"} / 5
            </p>

            {/* Rating de los jugadores */}
            <p className="text-center text-info">Rating de los jugadores</p>
            <ul className="lista_sin_estilo borde_rating pb-2">
              {ratings.map((rating) => (
                <li key={rating.id}>
                  {ratingsEspañol[index]} --- {rating.count}
                  {index++}
                </li>
              ))}
            </ul>

            {/* Nota de Metacritic */}
            <p className="text-center text-warning">Metacritic</p>
            <p className="text-center">
              <a
                className="enlace_metacritic p-3"
                href={videojuego.metacritic_url || "#"}
                target="_blank"
              >
                {videojuego.metacritic || "n/a"}
              </a>
            </p>
          </div>

          {/* Botón para mostrar modal */}
          {dataLocalStorage ? (
            <button
              type="button"
              className="btn btn-primary modal_trigger"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              // onClick={comprobarUsuario}
            >
              Añadir juego al perfil
            </button>
          ) : (
            // <button
            //   type="button"
            //   className="btn btn-primary modal_trigger"
            //   disabled
            // >
            //   Añadir juego al perfil
            // </button>
            ""
          )}
          {/* Fin del botón para mostrar el modal */}

          {/* Fin del rating */}
        </div>
        {/* Fin de la imagen y del rating del juego */}

        {/* Información del juego */}
        <div className="info_juego">
          {/* Nombre del videojuego */}
          <p className="fs-2 text-center text-primary">
            <strong>{videojuego.name || "El videojuego no existe"}</strong>
          </p>
          {/* Rating según la ESRB */}
          <p className="text-center">
            Calificación por edades:{" "}
            <strong>
              {calificacionEdadesEspañol[calificacionEdades.id] ||
                "PEGI no disponible"}
            </strong>
          </p>
          {/* Fecha de lanzamiento y publishers del videojuego */}
          <p className="text-center">
            Fecha de lanzamiento:{" "}
            <strong>{videojuego.released || "n/a"}</strong> Publishers: &nbsp;
            {publishers.map((publisher) => (
              <strong key={publisher.id}>{publisher.name}. </strong>
            ))}
          </p>
          {/* Descripción del videojuego */}
          <p className="descripcion">
            {descripcionEspañola || videojuego.description_raw}
          </p>

          <hr />

          {/* Plataformas en las que ha salido el juego y géneros */}
          <div className="div_plataformas_generos">
            {/* Plataformas en las que el videojuego está */}
            <div className="div_plataformas">
              <p className="text-center text-primary">Lanzado en: </p>
              {plataformas.map((plataforma) => (
                <p key={plataforma.platform.id} className="text-center">
                  {plataforma.platform.name}
                </p>
              ))}
            </div>
            {/* Fin de las plataformas en las que el juego se encuentra */}

            {/* Géneros del juego */}
            <div className="div_generos">
              <p className="text-center text-primary">Géneros:</p>
              {generos.map((genero) => (
                <p key={genero.id} className="text-center">
                  {genero.name}
                </p>
              ))}
            </div>
            {/* Fin de los géneros del juego */}
          </div>
        </div>
        {/* Fin de la información del juego */}

        {/* Modal */}
        <div
          className="modal fade text-black"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                {existeJuegoEnPerfil ? (
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    ¿Modificar {videojuego.name}?
                  </h1>
                ) : (
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    ¿Añadir {videojuego.name} al perfil?
                  </h1>
                )}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              {/* contenido del Modal */}
              <div className="modal-body">
                {/* Inicio del formulario */}
                <form onSubmit={handleSubmit} method="POST">
                  {/* Select con el estado del juego (obligatorio) */}
                  <div className="mb-3">
                    <label for="selectOption" className="form-label">
                      Estado 
                    </label>
                    <select
                      className="form-select"
                      id="selectOption"
                      required
                      name="estado"
                      onChange={handleChangeEstadoJuego}
                    >
                      <option selected value="0">
                        Seleccione una opción...
                      </option>
                      <option value="terminado">Terminado</option>
                      <option value="jugando">Jugando</option>
                      <option value="planeado jugar">Planeado jugar</option>
                      <option value="abandonado">Abandonado</option>
                    </select>
                  </div>

                  {/* Nota del juego (opcional) */}
                  <div className="mb-3">
                    <label for="decimalInput" className="form-label">
                      Nota
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="5"
                      className="form-control"
                      id="decimalInput"
                      placeholder="Con dos decimales, de 0 al 5"
                      name="nota"
                      value={nota_juego}
                      onChange={handleChangeNotaJuego}
                    ></input>
                  </div>

                  {/* Reseña/comentario del juego (opcional) */}
                  <div className="mb-3">
                    <label for="textArea" className="form-label">
                      Reseña
                    </label>
                    <textarea
                      className="form-control"
                      id="textArea"
                      rows="3"
                      placeholder="Escribe aquí la reseña/comentario"
                      name="resena"
                      value={reseña}
                      onChange={handleChangeReseña}
                    ></textarea>
                  </div>

                  {/* Fecha de inicio del juego (opcional) */}
                  <div className="mb-3">
                    <label for="dateBeforeToday" className="form-label">
                      Fecha de inicio
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="dateBeforeToday"
                      name="fecha_inicio"
                      value={fecha_inicio}
                      onChange={handleChangeFechaInicio}
                      max={fechaFormateada}
                    ></input>
                  </div>

                  {/* Fecha en la que se terminó el juego (opcional) */}
                  <div className="mb-3">
                    <label for="dateToday" className="form-label">
                      Fecha de finalización
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="dateToday"
                      name="fecha_fin"
                      value={fecha_fin}
                      onChange={handleChangeFechaFin}
                      min={fecha_inicio}
                      max={fechaFormateada}
                    ></input>
                  </div>

                  {/* Veces que se ha jugado al videojuego (opcional) */}
                  <div className="mb-3">
                    <label for="numberInput" className="form-label">
                      Veces terminado
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="numberInput"
                      name="veces_jugado"
                      value={veces_jugado}
                      onChange={handleChangeVecesJugado}
                    ></input>
                  </div>

                  {/* Mostrar alerta si hay un error */}
                  {errors && (
                    <div
                      className="alert alert-danger mi_alert mt-3 mb-3"
                      role="alert"
                    >
                      {errors}
                    </div>
                  )}
                  {/* Fin de la alerta */}

                  {/* Boton para enviar el formulario */}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={comprobarErrores}
                  >
                    Añadir juego al perfil
                  </button>
                  {/* Fin del boton para enviar el formulario */}
                </form>
              </div>
              {/* Fin del contenido del modal */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Fin del modal */}
      </div>

      {/* Fin del contenedor del juego */}
    </div>
  );
};

export default UnVideojuego;
