import React, { useState } from "react";

// Funciones del formulario
import useFormModal from "../services/hooks/useFormModal";

// Consultas
import modificarJuegoPerfil from "../queries/modificarJuegoPerfil";
import eliminarJuegoPerfil from "../queries/eliminarJuegoPerfil";

const OneJuegoPerfil = ({ juegoPerfil }) => {
  console.log(juegoPerfil);

  const { handleSubmit, errors, handleErrors, errorPersonalizado } =
    useFormModal();

  // Comprobar si el usuario escribió una reseña
  const [reseña, setReseña] = useState(juegoPerfil.reseña);
  let existeReseña = false;

  if (reseña.trim() != "") {
    existeReseña = true;
  }

  // Manejar cambios en la reseña del videojuego
  const handleChangeReseña = (e) => {
    setReseña(e.target.value);
  };

  // Comprobar si el usuario escribió las veces que jugó al juego
  const [veces_jugado, setVecesJugado] = useState(juegoPerfil.veces_jugado);
  let existeVecesJugado = false;

  if (veces_jugado > 0) {
    existeVecesJugado = true;
  }

  // Manejar cambios en las veces que se ha jugado a un juego
  const handleChangeVecesJugado = (e) => {
    setVecesJugado(e.target.value);
  };

  // Comprobar si se ha indicado fecha de inicio y de finalización
  const [fecha_inicio, setFechaInicio] = useState(juegoPerfil.fecha_inicio || "");
  let existeFechaInicio = false;
  const [fecha_fin, setFechaFin] = useState(juegoPerfil.fecha_fin || "");
  let existeFechaFin = false;

  if (fecha_inicio != "" && fecha_fin != "") {
    existeFechaInicio = true;
    existeFechaFin = true;
  }

  // Manejar cambios en la fecha de inicio
  const handleChangeFechaInicio = (e) => {
    setFechaInicio(e.target.value);
  };

  // Manejar cambios en la fecha de fin
  const handleChangeFechaFin = (e) => {
    setFechaFin(e.target.value);
  };

  // La nota del juego
  const [nota_juego, setNotaJuego] = useState(juegoPerfil.nota_juego);

  // Manejar cambios en la nota del juego
  const handleChangeNotaJuego = (e) => {
    setNotaJuego(e.target.value);
  };

  // El estado del juego
  const [estadoJuego, setEstadoJuego] = useState(juegoPerfil.estado_juego);

  // Manejar cambios en el estado del juego
  const handleChangeEstadoJuego = (e) => {
    setEstadoJuego(e.target.value);
  };

  // El estado del juego con la primera letra en mayúscula
  let estadoJuegoFormateado =
    estadoJuego.charAt(0).toUpperCase() + estadoJuego.slice(1);
  /* 
    charAt(0) --> Me quedo con la primera letra del string
    toUpperCase() --> Convertir string en mayúscula
    slice(1) --> Me quedo con el string a partir de la posición 1 (la posición 0
    es la primera letra del string)
    Junto la primera letra del string en mayúscula y el resto del string para obtener
    el estado del juego con el formato que necesito. 
  */

  // ***************************************************
  let fecha = new Date();
  let año = fecha.getFullYear();
  let mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Meses empiezan en 0
  let día = String(fecha.getDate()).padStart(2, "0");
  let fechaFormateada = `${año}-${mes}-${día}`;

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
    if (!errores) {
      modificarJuego();
    }
  };

  // Modificar el juego
  const modificarJuego = async () => {
    const { id_usuario, id_juego } = juegoPerfil;
    const formDataJuego = new FormData();
    formDataJuego.append("id_usuario", id_usuario);
    formDataJuego.append("id_juego", id_juego);
    formDataJuego.append("estado_juego", estadoJuego);
    formDataJuego.append("nota_juego", nota_juego);
    formDataJuego.append("reseña", reseña);
    formDataJuego.append("fecha_inicio", fecha_inicio);
    formDataJuego.append("fecha_finalizacion", fecha_fin);
    formDataJuego.append("veces_jugado", veces_jugado);

    const respuesta = await modificarJuegoPerfil(formDataJuego);
    if (respuesta) {
      window.location.href = "/usuario";
    } else {
      errorPersonalizado("Error al modificar el juego en el perfil");
    }
  };

  // Eliminar el juego
  const eliminarJuego = async () => {
    const { id_usuario, id_juego } = juegoPerfil;
    const formDataJuego = new FormData();
    formDataJuego.append("id_usuario", id_usuario);
    formDataJuego.append("id_juego", id_juego);

    const respuesta = await eliminarJuegoPerfil(formDataJuego);
    if (respuesta) {
      window.location.href = "/usuario";
    } else {
      errorPersonalizado("Error al eliminar el juego del perfil");
    }
  };

  return (
    <tr>
      <th scope="row info_juego">
        {/* Imagen del juego */}
        <img
          src={juegoPerfil.imagen_juego}
          alt={juegoPerfil.nombre_juego}
          className="imagen_tabla"
        />{" "}
        {/* Nombre del juego */}
        {juegoPerfil.nombre_juego}
        {/* Las veces que se ha jugado al juego (si está indicado) */}
        {existeVecesJugado && (
          <div className="icon_container">
            <span className="tooltip_text text_small">
              Veces jugado: {juegoPerfil.veces_jugado}
            </span>
            <i className="bi bi-controller ms-5 icon"></i>
          </div>
        )}
        {/* Reseña del juego (si existe) */}
        {existeReseña && (
          <div className="icon_container">
            <span className="tooltip_text">{juegoPerfil.reseña}</span>
            <i className="bi bi-chat-left-fill ms-5 icon"></i>
          </div>
        )}
        {/* Fecha de inicio y fin (si existe) */}
        {existeFechaInicio && existeFechaFin && (
          <div className="icon_container">
            <span className="tooltip_text">
              Inicio: {juegoPerfil.fecha_inicio} Fin:{" "}
              {juegoPerfil.fecha_finalizacion}
            </span>
            <i className="bi bi-calendar-fill ms-5 icon"></i>
          </div>
        )}
      </th>
      {/* Estado del juego */}
      <td className="text-center">{estadoJuegoFormateado}</td>
      {/* Nota del juego */}
      <td className="text-center">{juegoPerfil.nota_juego}/5.00</td>
      {/* Botón para modificar el juego en el perfil */}
      <td className="text-center">
        <button
          type="button"
          className="btn modal_trigger"
          data-bs-toggle="modal"
          data-bs-target={`#modalModificarJuego${juegoPerfil.id_juego}`}
        >
          <i className="bi bi-file-earmark-text-fill text-primary icon"></i>
        </button>
      </td>
      {/* Botón para eliminar el juego del perfil */}
      <td className="text-center">
        <button
          type="button"
          className="btn modal_trigger"
          data-bs-toggle="modal"
          data-bs-target={`#modalEliminarJuego${juegoPerfil.id_juego}`}
        >
          <i className="bi bi-trash-fill text-danger icon"></i>
        </button>
      </td>

      {/* Modal de modificar el juego */}
      <div
        className="modal fade text-black"
        id={`modalModificarJuego${juegoPerfil.id_juego}`}
        tabIndex="-1"
        aria-labelledby="modalModificar"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modalModificar">
                ¿Modificar {juegoPerfil.nombre_juego}?
              </h1>
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
                  <label htmlFor="selectOption" className="form-label">
                    Estado -- Actualmente: {estadoJuegoFormateado}
                  </label>
                  <select
                    className="form-select"
                    id="selectOption"
                    required
                    name="estado"
                    onChange={handleChangeEstadoJuego}
                    // defaultValue={"Seleccione una opción..."}
                  >
                    <option value="0">Seleccione una opción...</option>
                    <option value="terminado">Terminado</option>
                    <option value="jugando">Jugando</option>
                    <option value="planeado jugar">Planeado jugar</option>
                    <option value="abandonado">Abandonado</option>
                  </select>
                </div>
                {/* Nota del juego (opcional) */}
                <div className="mb-3">
                  <label htmlFor="decimalInput" className="form-label">
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
                  <label htmlFor="textArea" className="form-label">
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
                  <label htmlFor="dateBeforeToday" className="form-label">
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
                  <label htmlFor="dateToday" className="form-label">
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
                  <label htmlFor="numberInput" className="form-label">
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
                  Modificar juego en el perfil
                </button>
              </form>
            </div>
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
      {/* Fin del modal de modificar juego */}

      {/* Modal para eliminar un juego */}
      <div
        className="modal fade"
        id={`modalEliminarJuego${juegoPerfil.id_juego}`}
        tabIndex="-1"
        aria-labelledby="modalEliminar"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modalEliminar">
                ¿Eliminar {juegoPerfil.nombre_juego}?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={eliminarJuego}
              >
                Eliminar juego
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Fin del modal para eliminar un juego */}
    </tr>
  );
};

export default OneJuegoPerfil;
