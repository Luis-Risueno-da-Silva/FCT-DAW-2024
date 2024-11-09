const modificarJuegoPerfil = (formData) => {
  // Consulta a la base de datos
  return fetch(
    "http://localhost/baul_juegos/peticiones/modificarJuegoPerfil.php",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => response.json()) // Obtener los datos
    .then((data) => {
      console.log(data)
      if (data.message == "Registro modificado correctamente.") {
        console.log(data);
        return true;
      } else {
        return false;
      }
    });
}

export default modificarJuegoPerfil;