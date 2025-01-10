import React from "react";

// Importar estilos
import "../styles/paginaConfig.css";

// Hook personalizado
import useFormConfiguracion from "../services/hooks/useFormConfiguración";

// Consultas
import obtenerIdUsuario from "../queries/obtenerIdUsuario";
import modificarDatosUsuario from "../queries/modificarDatosUsuario";

const PaginaConfig = () => {
  const {
    datosForm,
    handleChange,
    handleSubmit,
    errors,
    handleErrors,
    errorPersonalizado,
    mensajeInformativo,
    mensajeInformativoPersonalizado,
  } = useFormConfiguracion();

  let idUsuario;

  // Comprobar errores en el formulario
  const comprobarErrores = async () => {
    let errores = await handleErrors();

    if (errores == false) {
      enviarFormulario();
    }
  };

  // Enviar formulario
  const enviarFormulario = async () => {
    let datosLocalStorage = JSON.parse(localStorage.getItem("datosUsuario"));
    let nombreUsuario = datosLocalStorage.nombre;
    let nombreFormateado = nombreUsuario.trim().replace(/ /g, "-");

    let formDataNombre = new FormData();
    formDataNombre.append("nombre", nombreFormateado);

    let datosUsuario = await obtenerIdUsuario(formDataNombre);
    idUsuario = datosUsuario.id;

    // console.log("El id del usuario es: "+idUsuario)

    if (idUsuario != false && idUsuario != undefined) {
      modificarDatos();
    }
  };

  // Modificar los datos del usuario
  const modificarDatos = async () => {
    const formData = new FormData();
    formData.append("id", idUsuario);
    formData.append("privacidad", parseInt(datosForm.privacidad));

    let respuesta = await modificarDatosUsuario(formData);

    if (respuesta == true) {
      mensajeInformativoPersonalizado("Modificación realizada correctamente");
    } else {
      errorPersonalizado("Error al modificar los datos, inténtalo más tarde");
    }
  };

  return (
    <div>
      <h1 className="text-center title">Configuración</h1>

      {/* Formulario */}
      <div className="w-100 mi_form">
        <form onSubmit={handleSubmit} method="POST">
          {/* Privacidad del perfil */}
          <div className="mb-3">
            <label htmlFor="selectOprion" className="form-label">
              ¿Quién puede ver tu baúl?
            </label>
            <select
              className="form-select"
              id="selectOption"
              required
              name="privacidad"
              onChange={handleChange}
            >
              <option selected disabled value="0">
                Selecciona una opción...
              </option>
              <option value="1">Todos los usuarios</option>
              <option value="2">Nadie</option>
            </select>
          </div>
          {/* Fin de la privacidad del perfil */}

          {/* Mostrar alert si hay error */}
          {errors && (
            <div className="alert alert-danger mi_alert mt-3" role="alert">
              {errors}
            </div>
          )}
          {/* Fin del alert */}

          {/* Mostrar alert con información */}
          {mensajeInformativo && (
            <div className="alert alert-success" role="alert">
              {mensajeInformativo}
            </div>
          )}
          {/* Fin del alert */}

          {/* Botón para mandar el formulario */}
          <button
            type="submit"
            className="btn btn-primary"
            onClick={comprobarErrores}
          >
            Cambiar configuración
          </button>
          {/* Fin del botón */}
        </form>
      </div>
      {/* Final del formulario */}
    </div>
  );
};

export default PaginaConfig;
