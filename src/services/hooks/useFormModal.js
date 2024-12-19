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
    // console.log(parseFloat(datosForm.nota) % 1)
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
      setErrors("Debes de indicar un estado del juego");
      return errores;
    }

    // Si el videojuego está terminado, es obligatorio poner nota
    if (estado == "terminado") {
      if (nota == "") {
        errores = true;
        setErrors("Si has terminado un juego, ponle una nota");
        return errores;
      }
    }

    // Si el videojuego se planea para jugar, no hay nota
    if (estado == "planeado jugar") {
      if (nota != "") {
        errores = true;
        setErrors("No puedes poner nota a un juego que todavía no has jugado")
        return errores;
      }
    }

    // Que la nota se encuentre entre 0 y 5
    if (nota != "") {
      if (nota < 0 || nota > 5) {
        errores = true;
        setErrors("La nota del juego debe de ser un número decimal entre 0 y 5")
        return errores;
      }
    }

    // La nota del juego debe de acabar en .00 o .50
    if (nota != "") {

      let numero = parseFloat(nota)
      console.log(numero)
      
      let decimal = numero % 1
      console.log(decimal)

      // Validar si termina en .00 o .50
      if (decimal == "0" || decimal == "0.5") {
        errores = false;
        return errores;
      }else {
        errores = true;
        setErrors("La nota del juego debe de acabar en .00 o en .50");
        return errores;
      }
    }

    // Si hay fecha de inicio en un juego terminado, debe de haber una fecha de fin
    if (fecha_inicio != "") {
      if (estado == "terminado") {
        if (fecha_fin == "") {
          errores = true;
          setErrors("Fecha de finalización no indicada");
          return errores;
        } else {
          if (fecha_fin < fecha_inicio) {
            errores = true;
            setErrors(
              "La fecha de finalización no puede ser menor que la de inicio"
            );
            return errores;
          }
        }
      }
    }

    // No puede haber fecha de fin si no hay fecha de inicio
    if (fecha_fin != "") {
      if (fecha_inicio == "") {
        errores = true;
        setErrors("Debes de indicar una fecha de inicio");
        return errores;
      }
    }

    // Las veces jugado no puede ser inferior de 0
    if (veces_jugado < 0) {
      errores = true;
      setErrors("Dato incorrecto en Veces terminado: no puede ser menor que 0");
      return errores;
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
