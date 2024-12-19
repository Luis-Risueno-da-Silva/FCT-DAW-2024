import { useState } from "react";

const useFormBuscarUsuario = () => {
  const [errors, setErrors] = useState("");

  // Mostrar un error personalizado
  const errorPersonalizado = (texto) => {
    setErrors(texto);
  };

  return { errors, errorPersonalizado };
};

export default useFormBuscarUsuario;
