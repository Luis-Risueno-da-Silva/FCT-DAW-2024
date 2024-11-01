const verificarCorreo = (formData) => {
  // Consulta a la base de datos
  return fetch("http://localhost/baul_juegos/peticiones/verificarCorreo.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json()) // Obtener los datos
    .then((data) => {
      console.log("Datos: ", data);
      // Si el resultado no devuelve nada, significa que NO existe el correo
      if (data.length == 0) {
        console.log("Correo no encontrado");
        return false; // Retorna falso
      } else {
        // Si el resultado devuelve algo, significa que existe el correo
        console.log("Correo encontrado");
        return true; // Retorna verdadero
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      return;
    });
};

export default verificarCorreo;
