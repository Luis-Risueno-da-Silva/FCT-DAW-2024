const eliminarJuegoPerfil = (formData) => {
  // Consulta a la base de datos
  return fetch(
    "http://localhost/baul_juegos/peticiones/eliminarJuegoPerfil.php",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => response.json()) // Obtener los datos
    .then((data) => {
      console.log(data)
      if (data.message == "Registro eliminar correctamente.") {
        console.log(data);
        return true;
      } else {
        return false;
      }
    });
}

export default eliminarJuegoPerfil;