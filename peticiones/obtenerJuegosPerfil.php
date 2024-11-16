<?php
include "../db/db_connection_Baul_Juegos.php";

// Obtener dato por POST
$id_usuario = $_POST["id_usuario"];

// Preparar y ejecutar la consulta
$stmt = $conn->prepare("SELECT * FROM juegos WHERE id_usuario = ?");
$stmt->bind_param("s", $id_usuario);
$stmt->execute();
$result = $stmt->get_result();

// Array para almacenar los resultados
$response = []; 

// Indicar que el resultado es de tipo JSON
header('Content-Type: application/json');

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Agregar cada fila al array de respuesta
        $response[] = $row;
    }
    // Enviar la respuesta completa en JSON
    echo json_encode($response);
} else {
    echo json_encode([]);
}

$stmt->close();
$conn->close();
