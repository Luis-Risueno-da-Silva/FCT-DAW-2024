const cerrarSesion = () => {

    // Elimidar datos del usuario en el localStorage
    localStorage.removeItem("datosUsuario");

    // Enviar al usuario a la página de juegos
    window.location.href = "/juegos";

}

export default cerrarSesion