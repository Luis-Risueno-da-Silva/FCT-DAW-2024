<?php

include "../db/db_conecction_Tabla_Usuario.php";

// Obtener datos por POST
$nombre = $_POST["nombre"];

// Consulta
$sql = "CREATE TABLE `$nombre` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_juego VARCHAR(255) NOT NULL,
    imagen_juego VARCHAR(255) NOT NULL,
    estado_juego TINYINT(1) NOT NULL CHECK (estado_juego BETWEEN 1 AND 4),
    nota_juego DECIMAL(3, 2) DEFAULT NULL CHECK (nota_juego >= 0 AND nota_juego <= 5),
    resena TEXT DEFAULT NULL,
    fecha_inicio DATE DEFAULT NULL,
    fecha_fin DATE DEFAULT NULL,
    veces_jugado INT DEFAULT NULL
)";

// Ejecutar la consulta
if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Tabla creada exitosamente."]);
} else {
    echo json_encode(["success" => false, "message" => "Error al crear la tabla: " . $conn->error]);
}

// Cerrar la conexión
$conn->close();