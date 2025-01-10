import { useState } from "react";

const useFormReg = () => {
  // Datos del formulario
  const [datosForm, setdatosForm] = useState({
    nombre: "",
    correo_electronico: "",
    contraseña: "",
    contraseña_repetida: "",
  });
  const [errors, setErrors] = useState("");

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Settear atributos
    setdatosForm({
      ...datosForm,
      [name]: value,
    });
  };

  // Validar la contraseña
  const validarContraseña = (contraseña) => {
    /*
     *   Validación de la contraseña:
     *   Longitud: mínimo 8 caracteres
     *   Minúsculas
     *   Mayúsculas
     *   Números
     */
    const valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return valid.test(contraseña); // Valida longitud y combinación
  };

  // Validar el correo electrónico
  const validarCorreo = (correo) => {
    /*
     * Validación del correo electrónico
     * Debe de estar en minúscula.
     * La primera parte puede tener letras y números.
     * Debe de contener un @.
     * Después del @ sólo puede tener letras.
     * Debe de acabar en .com o .es
     */
    const valid = /^[a-z0-9.-]+@[a-z]+\.(com|es)$/;
    return valid.test(correo);
  };

  // Evitar que el formulario se envíe
  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario
  };

  // Comprobar errores
  const handleErrors = () => {
    // Obtener datos del formulario
    const { nombre, correo_electronico, contraseña, contraseña_repetida } =
      datosForm;

    // Inicializar errores a false
    let errores = false;

    // Comprobar que se haya escrito un usuario
    if (nombre == "") {
      setErrors("Por favor, escribe el nombre de usuario");
      errores = true;
      return errores;
    }

    // Validar que el correo esté bien escrito
    if (!validarCorreo(correo_electronico)) {
      setErrors(
        "El formato del correo electróncio es: example@example.com/.es"
      );
      errores = true;
      return errores;
    }

    // Validar la fortaleza de la contraseña
    if (!validarContraseña(contraseña)) {
      setErrors(
        "La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números"
      );
      errores = true;
      return errores;
    }

    // Validar si las contraseñas coinciden
    if (contraseña !== contraseña_repetida) {
      setErrors("Las contraseñas no coinciden");
      errores = true;
      return errores;
    }

    // Si todo es correcto
    return errores;
  };

  // Mostrar un error personalizado
  const errorPersonalizado = (texto) => {
    setErrors(texto)
  }

  return { datosForm, handleChange, handleSubmit, handleErrors, errors, errorPersonalizado };
};

export default useFormReg;
