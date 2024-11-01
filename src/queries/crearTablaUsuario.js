const crearTablaUsuario = (formData) => {
  // Consulta a la base de datos
  return fetch(
    "http://localhost/baul_juegos/peticiones/crearTablaUsuario.php",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => response.json()) // Obtener los datos
    .then((data) => {
      if (data.message == "Tabla creada exitosamente.") {
        console.log(data);
        return true;
      } else {
        return false;
      }
    });
};

export default crearTablaUsuario;
