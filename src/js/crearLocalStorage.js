const crearLocalStorage = (nombre) => {

    // Datos que se guardarán en el localStorage
    let datos = {
        "nombre": nombre,
    }

    // Aladir datos al localStorage
    localStorage.setItem("datosUsuario", JSON.stringify(datos))

    // Enviar al usuario a la página de juegos
    window.location.href = "/juegos";

}

export default crearLocalStorage;