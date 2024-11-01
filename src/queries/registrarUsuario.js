const registrarUsuario = (formData) => {
  // Consulta a la base de datos
  return fetch("http://localhost/baul_juegos/peticiones/registrarUsuario.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json()) // Obtener los datos
    .then((data) => {
      if (data.message == "Registro insertado correctamente.") {
        console.log(data);
        return true;
      } else {
        return false;
      }
    });
};

export default registrarUsuario;
