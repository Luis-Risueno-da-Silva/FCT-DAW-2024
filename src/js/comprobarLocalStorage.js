import { useState, useEffect } from "react";

const comprobarLocalStorage = () => {
  const [dataLocalStorage, setDataLocalStorage] = useState(false);

  const comprobarDatosLocalStorage = () => {
    // Comprobar si existe información en el localStorage
    if (localStorage.getItem("datosUsuario")) {
      let datos = JSON.parse(localStorage.getItem("datosUsuario"))
      let nombre = datos.nombre;
      setDataLocalStorage(nombre)
    } else {
      setDataLocalStorage(false)
    }
  };

  useEffect(comprobarDatosLocalStorage, []);

  return dataLocalStorage;
};

export default comprobarLocalStorage;
