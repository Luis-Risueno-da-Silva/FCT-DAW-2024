import React from "react";

const OneJuegoUsuarioBuscado = ({ juegoPerfilBuscado }) => {
  // Comprobar si el usuario escribió una reseña
  let reseña = juegoPerfilBuscado.reseña;
  let existeReseña = false;

  if (reseña.trim() != "") {
    existeReseña = true;
  }

  // Comprobar si el usuario escribió las veces que jugó al juego
  let veces_jugado = juegoPerfilBuscado.veces_jugado;
  let existeVecesJugado = false;

  if (veces_jugado > 0) {
    existeVecesJugado = true;
  }

  // Comprobar si se ha indicado fecha de inicio y de finalización
  let fecha_inicio = juegoPerfilBuscado.fecha_inicio;
  let existeFechaInicio = false;
  let fecha_fin = juegoPerfilBuscado.fecha_finalizacion;
  let existeFechaFin = false;

  if (fecha_inicio != "0000-00-00" && fecha_fin != "0000-00-00") {
    existeFechaInicio = true;
    existeFechaFin = true;
  }

  // El estado del juego
  let estadoJuego = juegoPerfilBuscado.estado_juego;
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

  return (
    <tr>
      <th scope="row info_juego">
        {/* Imagen del juego */}
        <img
          src={juegoPerfilBuscado.imagen_juego}
          alt={juegoPerfilBuscado.nombre_juego}
          className="imagen_tabla"
        />{" "}
        {/* Nombre del juego */}
        {juegoPerfilBuscado.nombre_juego}
        {/* Las veces que se ha jugado al juego (si está indicado) */}
        {existeVecesJugado && (
          <div className="icon_container">
            <span className="tooltip_text text_small">
              Veces jugado: {juegoPerfilBuscado.veces_jugado}
            </span>
            <i class="bi bi-controller ms-5 icon"></i>
          </div>
        )}
        {/* Reseña del juego (si existe) */}
        {existeReseña && (
          <div className="icon_container">
            <span className="tooltip_text">{juegoPerfilBuscado.reseña}</span>
            <i className="bi bi-chat-left-fill ms-5 icon"></i>
          </div>
        )}
        {/* Fecha de inicio y fin (si existe) */}
        {existeFechaInicio && existeFechaFin && (
          <div className="icon_container">
            <span className="tooltip_text">
              Inicio: {juegoPerfilBuscado.fecha_inicio} Fin: {juegoPerfilBuscado.fecha_finalizacion}
            </span>
            <i className="bi bi-calendar-fill ms-5 icon"></i>
          </div>
        )}
      </th>
      {/* Estado del juego */}
      <td className="text-center">{estadoJuegoFormateado}</td>
      {/* Nota del juego */}
      <td className="text-center">{juegoPerfilBuscado.nota_juego}/5.00</td>
    </tr>
  );
};

export default OneJuegoUsuarioBuscado;
