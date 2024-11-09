import { useState } from "react";

const useFormModal = () => {
  // Datos del formulario
  const [datosForm, setDatosForm] = useState({
    estado: "",
    nota: 0,
    resena: "",
    fecha_inicio: "",
    fecha_fin: "",
    veces_jugado: 0,
  });
  const [errors, setErrors] = useState("");

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Settear atributos
    setDatosForm({
      ...datosForm,
      [name]: value,
    });
  };

  // Evitar que el formulario se envíe
  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario

    console.log(datosForm);
  };

  // Comprobar errores
  const handleErrors = () => {
    const { estado, nota, resena, fecha_inicio, fecha_fin, veces_jugado } =
      datosForm;

    // Inicializar errores a false
    let errores = false;

    if (estado == "") {
      setErrors("Debes de indicar un estado del juego")
      return errores;
    }

    if (fecha_inicio != "") {
      if (estado == "terminado") {
        if (fecha_fin == "") {
          setErrors("Fecha de finalización no indicada")
          return errores;
        }
      }
    }

    // Si todo es correcto
    return errores;

  };

  // Mostrar un error personalizado
  const errorPersonalizado = (texto) => {
    setErrors(texto);
  };

  return {
    datosForm,
    handleChange,
    handleSubmit,
    errors,
    handleErrors,
    errorPersonalizado,
  };
};

export default useFormModal;
