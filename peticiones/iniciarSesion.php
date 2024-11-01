<?php

include "../db/db_connection_Baul_Juegos.php";

// Obtener datos por POST
$nombre = $_POST["nombre"];
$contraseña = $_POST["contraseña"];
$contraseña_encriptada = hash('sha256', $contraseña);

// Preparar y ejecutar la consulta de forma segura
$stmt = $conn->prepare("SELECT * FROM usuarios WHERE nombre = ? and contraseña = ?");
$stmt->bind_param("ss", $nombre, $contraseña_encriptada);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Devolver los datos como JSON
    echo json_encode($result->fetch_assoc());
} else {
    echo json_encode([]);
}

// Cerrar la conexion
$stmt->close();
$conn->close();