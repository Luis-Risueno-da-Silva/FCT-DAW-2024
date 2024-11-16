const verificarJuegoPerfil = (formData) => {
  // Consulta a la base de datos
  return fetch("http://localhost/baul_juegos/peticiones/verificarJuegoPerfil.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json()) // Obtener los datos
    .then((data) => {
      console.log("Datos: ", data);
      // Si el resultado no devuelve nada, significa que NO existe el juego
      if (data.length == 0) {
        console.log("Juego no encontrado");
        return false; // Retorna falso
      } else {
        // Si el resultado devuelve algo, significa que existe el juego
        console.log("Juego encontrado");
        return data; 
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      return;
    });
}

export default verificarJuegoPerfil;