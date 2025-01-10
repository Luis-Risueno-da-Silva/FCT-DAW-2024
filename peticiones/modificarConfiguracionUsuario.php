<?php

include "../db/db_connection_Baul_Juegos.php";

// Obtener datos por POST
$id = $_POST["id"];
$privacidad = $_POST["privacidad"];

// Preparar y ejecutar la consulta de forma segura
$stmt = $conn->prepare("UPDATE usuarios SET privacidad=? WHERE id=?");
$stmt->bind_param(
    "ss",
    $privacidad,
    $id
);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Registro modificado correctamente."]);
} else {
    echo json_encode(["success" => false, "message" => "Error al modificar: " . $stmt->error]);
}

// Cerrar la conexión
$stmt->close();
$conn->close();