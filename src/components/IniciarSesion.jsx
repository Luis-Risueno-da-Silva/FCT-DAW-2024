import React from "react";

// Importar estilos
import "../styles/iniciarSesion.css";

// Funciones del formulario
import useFormInicioSesion from "../services/hooks/useFormInicioSesion";

// Consultas
import iniciarSesion from "../queries/iniciarSesion";

// Función
import crearLocalStorage from "../js/crearLocalStorage";

const IniciarSesion = () => {
  const {
    datosForm,
    handleChange,
    handleSubmit,
    handleErrors,
    errors,
    errorPersonalizado,
  } = useFormInicioSesion();

  // Comprobar errores en el formulario
  const comprobarErrores = () => {

    console.log(datosForm)

    // Si hay errores, no hace falta comprobar los campos del formulario.
    setTimeout(() => {
      let errores = handleErrors();

      // console.log(errores)

      if (errores == false) {
        crearLocalStorage(datosForm.nombre);
      }
    }, 2000);
  };

  return (
    <div>
      <h1 className="text-center title">Iniciar Sesión</h1>

      {/* Formulario */}
      <div className="w-100 mi_form">
        <form onSubmit={handleSubmit} method="POST">
          {/* Nombre del usuario */}
          <div className="mb-3">
            <label className="form-label">Nombre de usuario</label>
            <input
              type="text"
              name="nombre"
              className="form-control mi_input"
              onChange={handleChange}
            ></input>
          </div>
          {/* Fin de nombre de usuario */}

          {/* Contraseña */}
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="contraseña"
              className="form-control mi_input"
              onChange={handleChange}
            ></input>
          </div>
          {/* Fin de la contraseña */}

          {/* Mostrar alert si hay error */}
          {errors && (
            <div className="alert alert-danger mi_alert mt-3" role="alert">
              {errors}
            </div>
          )}
          {/* Fin del alert */}

          {/* Botón para mandar el formulario */}
          <button
            type="submit"
            className="btn btn-primary"
            onClick={comprobarErrores}
          >
            Iniciar Sesión
          </button>
          {/* Fin del botón */}
        </form>
      </div>
      {/* Fin del formulario */}
    </div>
  );
};

export default IniciarSesion;
