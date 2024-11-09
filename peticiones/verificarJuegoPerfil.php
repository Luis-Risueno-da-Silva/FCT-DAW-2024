<?php

include "../db/db_connection_Baul_Juegos.php";

// Obtener dato por POST
$id_usuario = $_POST["id_usuario"];
$id_juego = $_POST["id_juego"];

// Preparar y ejecutar la consulta
$stmt = $conn->prepare("SELECT * FROM juegos WHERE id_usuario = ? AND id_juego = ?");
$stmt->bind_param("ss", $id_usuario, $id_juego);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Devolver los datos como JSON
    echo json_encode($result->fetch_assoc());
} else {
    echo json_encode([]);
}

$stmt->close();
$conn->close();