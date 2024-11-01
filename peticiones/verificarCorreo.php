<?php 

include "../db/db_connection_Baul_Juegos.php";

// Obtener dato por POST
$correo_electronico	 = $_POST["correo_electronico"];

// Preparar y ejecutar la consulta de forma segura
$stmt = $conn->prepare("SELECT * FROM usuarios WHERE correo_electronico	 = ?");
$stmt->bind_param("s", $correo_electronico	);
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