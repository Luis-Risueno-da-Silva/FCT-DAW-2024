import { useState } from "react";

const useFormInicioSesion = () => {
  // Datos del formulario
  const [datosForm, setdatosForm] = useState({
    nombre: "",
    contraseña: "",
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

  // Evitar que el formulario se envíe
  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario
  };

  // Comprobar errores   
  const handleErrors = () => {
    // Obtener datos del formulario
    const { nombre, contraseña } = datosForm;

    // Inicializar errores a false
    let errores = false;

    // Comprobar que se haya escrito un usuario
    if (nombre.trim() == "") {
        setErrors("Por favor, escribe el nombre de usuario");
        errores = true;
        return errores;
    }

    // Validar la fortaleza de la contraseña
    if (!validarContraseña(contraseña.trim())) {
        setErrors(
          "La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números"
        );
        errores = true;
        return errores;
    }

    // Si todo es correcto
    return errores;

  }

  // Mostrar un error personalizado
  const errorPersonalizado = (texto) => {
    setErrors(texto)
  }

  return { datosForm, handleChange, handleSubmit, handleErrors, errors, errorPersonalizado };

}

export default useFormInicioSesion