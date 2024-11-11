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

    // console.log(datosForm)
  };

  // Evitar que el formulario se envíe
  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario

    // console.log(datosForm);
  };

  // Comprobar errores
  const handleErrors = () => {
    const { estado, nota, resena, fecha_inicio, fecha_fin, veces_jugado } =
      datosForm;

    // Inicializar errores a false
    let errores = false;

    // Comprobar que se haya seleccionado un estado del juego
    if (estado == "") {
      errores = true;
      setErrors("Debes de indicar un estado del juego")
      return errores;
    }

    // Si el videojuego está terminado, es obligatorio poner nota
    if (estado == "terminado") {
      if (nota == "") {
        errores = true;
        setErrors("Si has terminado un juego, ponle una nota")
        return errores;
      }
    }

    // Si hay fecha de inicio en un juego terminado, debe de haber una fecha de fin
    if (fecha_inicio != "") {
      if (estado == "terminado") {
        if (fecha_fin == "") {
          errores = true;
          setErrors("Fecha de finalización no indicada")
          return errores;
        }else {
          if (fecha_fin < fecha_inicio) {
            errores = true;
            setErrors("La fecha de finalización no puede ser menor que la de inicio")
            return errores;
          }
        }
      }
    }

    // No puede haber fecha de fin si no hay fecha de inicio
    if (fecha_fin != "") {
      if (fecha_inicio == "") {
        errores = true;
        setErrors("Debes de indicar una fecha de inicio")
        return errores;
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
