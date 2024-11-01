<?php 

include "../db/db_connection_Baul_Juegos.php";

// Obtener dato por POST
$nombre = $_POST["nombre"];

// Preparar y ejecutar la consulta de forma segura
$stmt = $conn->prepare("SELECT * FROM usuarios WHERE nombre = ?");
$stmt->bind_param("s", $nombre);
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