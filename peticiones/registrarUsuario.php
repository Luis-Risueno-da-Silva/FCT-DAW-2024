<?php

include "../db/db_connection_Baul_Juegos.php";

// Obtener datos por POST
$nombre = $_POST["nombre"];
$correo_electronico = $_POST["correo_electronico"];
$contraseña = $_POST["contraseña"];
$contraseña_encriptada = hash('sha256', $contraseña);

// Preparar y ejecutar la consulta de forma segura
$stmt = $conn->prepare("INSERT INTO usuarios (nombre, correo_electronico, contraseña) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $nombre, $correo_electronico, $contraseña_encriptada);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Registro insertado correctamente."]);
}else {
    echo json_encode(["success" => false, "message" => "Error al insertar: " . $stmt->error]);
}

// Cerrar la conexión
$stmt->close();
$conn->close();