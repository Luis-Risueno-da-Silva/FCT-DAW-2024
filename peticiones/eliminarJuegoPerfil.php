<?php

include "../db/db_connection_Baul_Juegos.php";

// Obtener datos por POST
$id_usuario = $_POST["id_usuario"];
$id_juego = $_POST["id_juego"];

// Preparar y ejecutar la consulta de forma segura
$stmt = $conn->prepare("DELETE FROM juegos WHERE id_usuario = ? AND id_juego = ?");
$stmt->bind_param(
    "ss",
    $id_usuario,
    $id_juego
);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Registro eliminar correctamente."]);
} else {
    echo json_encode(["success" => false, "message" => "Error al eliminar: " . $stmt->error]);
}

// Cerrar la conexión
$stmt->close();
$conn->close();