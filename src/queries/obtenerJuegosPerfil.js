const obtenerJuegosPerfil = (formData) => {
  // Consulta a la base de datos
  return fetch("http://localhost/baul_juegos/peticiones/obtenerJuegosPerfil.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json()) // Obtener los datos
    .then((data) => {
      console.log("Datos: ", data);
      // Si el resultado no devuelve nada, significa que NO hay 
      // juegos en el perfil del usuario
      if (data.length == 0) {
        console.log("No hay juegos en el perfil");
        return false; // Retorna falso
      } else {
        // Si el resultado devuelve algo, significa que hay 
        // juegos en el perfil del usuario
        console.log("Hay juegos en el perfil");
        return data; 
      }
    })
    // .catch((error) => {
    //   console.error("Error:", error);
    //   return;
    // });
}

export default obtenerJuegosPerfil;