import React from "react";

const OneJuegoPerfil = ({ juegoPerfil }) => {
  console.log(juegoPerfil);

  let reseña = juegoPerfil.reseña;
  let existeReseña;

  // Comprobar si la reseña del juego existe o no
  if (reseña != "") {
    existeReseña = true;
  }

  return (
    <tr>
      <th scope="row">
        {/* Imagen del juego */}
        <img
          src={juegoPerfil.imagen_juego}
          alt={juegoPerfil.nombre_juego}
          className="imagen_tabla"
        />{" "}
        {/* Nombre del juego */}
        {juegoPerfil.nombre_juego}{" "}
        {/* Reseña del juego (si existe) */}
        {existeReseña && (
          <div className="icon-container">
            <span class="tooltip-text">{juegoPerfil.reseña}</span>
            <i className="bi bi-chat-left-fill ms-5 icon"></i>
          </div>
        )}
      </th>
      {/* Nota del juego */}
      <td className="text-center">{juegoPerfil.nota_juego}/5.00</td>
      {/* Botón para modificar el juego en el perfil */}
      <td className="text-center"><i class="bi bi-file-earmark-text-fill text-primary icon"></i></td>
      {/* Botón para eliminar el juego del perfil */}
      <td className="text-center"><i class="bi bi-trash-fill text-danger icon"></i></td>
    </tr>
  );
};

export default OneJuegoPerfil;
