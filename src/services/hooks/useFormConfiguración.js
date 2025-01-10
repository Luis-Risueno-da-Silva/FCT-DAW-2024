import { useState } from "react";

const useFormConfiguracion = () => {
  const [datosForm, setDatosForm] = useState({
    privacidad: "",
  });
  const [errors, setErrors] = useState("");
  const [mensajeInformativo, setMensajeInformativo] = useState("");

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Settear atributos
    setDatosForm({
      ...datosForm,
      [name]: value,
    });

    // console.log(datosForm)
  };

  // Evitar que el formulario se envíe
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Comprobar errores
  const handleErrors = () => {
    // Obtener datos del formulario
    const privacidad = datosForm.privacidad;

    // Inicializar errores a false
    let errores = false;

    // Comprobar que se haya indicado privacidad
    if (privacidad == "") {
        errores = true;
        setErrors("No se ha indicado tipo de privacidad")
        return errores;
    }

    // Si todo es correcto
    return errores;
  }   

  // Mostrar un error personalizado
  const errorPersonalizado = (texto) => {
    setErrors(texto)
  }

  // Mostrar un mensaje infornativo personalizado
  const mensajeInformativoPersonalizado = (texto) => {
    setErrors("")
    setMensajeInformativo(texto)
  }

  return {
    datosForm,
    handleChange,
    handleSubmit,
    errors,
    handleErrors,
    errorPersonalizado,
    mensajeInformativo,
    mensajeInformativoPersonalizado
  }

};

export default useFormConfiguracion;
