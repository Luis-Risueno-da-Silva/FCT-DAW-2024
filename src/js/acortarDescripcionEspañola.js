const acortarDescripcionEspañola = (texto, palabraInicio) => {
  // La palabra desde la que empieza el corte
  const inicio = texto.indexOf(palabraInicio);

  if (inicio !== -1) {
    // Sumo la longitud de la palabra para ocultarla
    return texto.slice(inicio + palabraInicio.length);
  }
  
};

export default acortarDescripcionEspañola;
