const obtenerDatosUsuario = (formData) => {
    // Consulta a la base de datos
    return fetch("http://localhost/baul_juegos/peticiones/obtenerDatosUsuario.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json()) // Obtener los datos
      .then((data) => {
        // console.log("Datos: ", data);
        // Si el resultado no devuelve nada, significa que NO existe el usuario
        if (data.length == 0) {
          console.log("Usuario no encontrado");
          return false; // Retorna falso
        } else {
          console.log("Usuario encontrado");
          return data; // Devolver datos del usuario
        }
      })
      // .catch((error) => {
      //   console.error("Error:", error);
      //   return;
      // });
  };
  
  export default obtenerDatosUsuario;
  