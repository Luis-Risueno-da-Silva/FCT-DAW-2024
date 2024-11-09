import React from "react";

// Importar estilos
import "../styles/RegistrarUsuario.css";

// Funciones del formulario
import useFormReg from "../services/hooks/useFormRegistro";

// Consultas
import verificarUsuario from "../queries/verificarUsuario";
import verificarCorreo from "../queries/verificarCorreo";
import registrarUsuario from "../queries/registrarUsuario";

// Función
import crearLocalStorage from "../js/crearLocalStorage";

const RegistrarUsuario = () => {
  const {
    datosForm,
    handleChange,
    handleSubmit,
    handleErrors,
    errors,
    errorPersonalizado,
  } = useFormReg();

  // console.log(datosForm)

  // Comprobar errores en el formulario
  const comprobarErrores = () => {
    setTimeout(() => {
      let errores = handleErrors();

      // console.log(errores)

      if (errores == false) {
        enviarFormulario();
      }
    }, 2000);
  };

  // Como no se pueden pasar parámetros en un onClick,
  // he optado por utilizar una función.
  const enviarFormulario = () => {
    /*
     * Un objeto FormData nos permite recopilar datos de
     * un formulario HTML y prepararlos para su envío a través de una solicitud HTTP
     */
    const formDataNombre = new FormData();
    formDataNombre.append("nombre", datosForm.nombre);

    const formDataCorreo = new FormData();
    formDataCorreo.append("correo_electronico", datosForm.correo_electronico);

    // Compruebo que el usuario no exista en la base de datos
    const obtenerRespuestaUsuario = async () => {
      // Se espera a que la petición termine
      let respuesta = await verificarUsuario(formDataNombre);

      // console.log(respuesta);

      // Comprobar que el usuario no exista en la base de datos
      if (respuesta == false) {
        console.log("Se procederá a comprobar que el correo tampoco exista");
        console.log("***********");
        obtenerRespuestaCorreo();
      }else {
        errorPersonalizado("Ya existe ese usuario, prueba con otro")
      }
    };

    // Comprobar que el correo no exista en la base de datos
    const obtenerRespuestaCorreo = async () => {
      // Se espera a que la función termine
      let respuesta = await verificarCorreo(formDataCorreo);

      // console.log(respuesta)

      // Comprobar que el correo no exista en la base de datos
      if (respuesta == false) {
        console.log("Ahora se procederá a insertar el nuevo usuario");
        console.log("***********");

        consultaRegistrarUsuario();
      }else {
        errorPersonalizado("Ya existe ese correo electrónico, prueba con otro")
      }
    };

    // Registrar el usuario en la base de datos
    const consultaRegistrarUsuario = async () => {
      const formDataRegistro = new FormData();
      formDataRegistro.append("nombre", datosForm.nombre);
      formDataRegistro.append(
        "correo_electronico",
        datosForm.correo_electronico
      );
      formDataRegistro.append("contraseña", datosForm.contraseña);

      // Se espera a que la función termine
      let respuesta = await registrarUsuario(formDataRegistro);

      if (respuesta == true) {
        crearLocalStorage(datosForm.nombre)
      }else {
        errorPersonalizado("Ocurrió un error al registrar el usuario")
      }
    };

    // Llamar a la función "obtenerRespuestaUsuario"
    obtenerRespuestaUsuario();
  };

  return (
    <div>
      <h1 className="text-center title">Registrar Usuario</h1>

      {/* Formulario */}
      <div className="w-100 mi_form">
        <form onSubmit={handleSubmit} method="POST">
          {/* Nombre de usuario */}
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

          {/* Correo electrónico */}
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              name="correo_electronico"
              className="form-control mi_input"
              placeholder="example@example.com"
              onChange={handleChange}
            ></input>
          </div>
          {/* Fin de correo electrónico */}

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

          {/* Repetir la contraseña */}
          <div className="mb-3">
            <label className="form-label">Repetir la contraseña</label>
            <input
              type="password"
              name="contraseña_repetida"
              className="form-control mi_input"
              onChange={handleChange}
            ></input>
          </div>
          {/* Fin de repetir la contraseña */}

          {/* Mostrar alerta si hay un error */}
          {errors && (
            <div className="alert alert-danger mi_alert mt-3" role="alert">
              {errors}
            </div>
          )}
          {/* Fin de la alerta */}

          {/* Botón para mandar el formulario */}
          <button
            type="submit"
            className="btn btn-primary"
            onClick={comprobarErrores}
          >
            Registrar
          </button>
          {/* Fin del botón */}

        </form>
      </div>
      {/* Fin del formulario */}
    </div>
  );
};

export default RegistrarUsuario;
