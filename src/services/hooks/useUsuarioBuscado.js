import { useState, useEffect } from "react";

import verificarUsuario from "../../queries/verificarUsuario";
import obtenerIdUsuario from "../../queries/obtenerIdUsuario";
import obtenerDatosUsuario from "../../queries/obtenerDatosUsuario";

const useUsuarioBuscado = (name) => {
  const [idUsuario, setIdUsuario] = useState();
  const [existeUsuario, setExisteUsuario] = useState(true);
  const [puedeVerActividad, setPuedeVerActividad] = useState(true);

  // Verificar que el usuario existe
  const comprobarExistenciaUsuario = () => {
    // Para enviar el nombre del usuario como parámetro
    let formDataNombre = new FormData();
    formDataNombre.append("nombre", name);

    verificarUsuario(formDataNombre).then((data) => {
      if (data == true) {
        setExisteUsuario(true);
      } else {
        setExisteUsuario(false);
      }
    });
    // console.log(existeUsuario);
  };

  // Obtener el id del usuario
  const conseguirIdUsuario = () => {
    // Para enviar el nombre del usuario como parámetro
    let formDataNombre = new FormData();
    formDataNombre.append("nombre", name);

    // Obtener el id del usuario
    obtenerIdUsuario(formDataNombre).then((data) => {
      setIdUsuario(data.id);
    });
  };

  // Comprobar privacidad del usuario
  const comprobarPrivacidadUsuario = () => {
    // Para enviar el nombre del usuario como parámetro
    let formDataNombre = new FormData();
    formDataNombre.append("nombre", name);

    obtenerDatosUsuario(formDataNombre).then((data) => {
      if (data != false) {
        if (data.privacidad == 1) {
          setPuedeVerActividad(true);
        } else {
          setPuedeVerActividad(false);
        }
      } else {
        setPuedeVerActividad(false);
      }
    });
  };
  
  // Ejecutar funciones cuando se busca a un usuario
  useEffect(comprobarExistenciaUsuario, [name]);
  useEffect(conseguirIdUsuario, [name]);
  useEffect(comprobarPrivacidadUsuario, [name]);
  return {
    existeUsuario,
    idUsuario,
    puedeVerActividad,
  };
};

export default useUsuarioBuscado;
