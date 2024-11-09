<?php

include "../db/db_connection_Baul_Juegos.php";

// Obtener datos por POST
$id_usuario = $_POST["id_usuario"];
$id_juego = $_POST["id_juego"];
$estado_juego = $_POST["estado_juego"];
$nota_juego = $_POST["nota_juego"];
$reseña = $_POST["reseña"];
$fecha_inicio = $_POST["fecha_inicio"];
$fecha_finalizacion = $_POST["fecha_finalizacion"];
$veces_jugado = $_POST["veces_jugado"];

// Preparar y ejecutar la consulta de forma segura
$stmt = $conn->prepare("UPDATE juegos SET estado_juego=?, nota_juego=?, reseña=?, fecha_inicio=?, fecha_finalizacion=?, veces_jugado=? WHERE id_usuario=? AND id_juego=?");
$stmt->bind_param(
    "ssssssss",
    $estado_juego,
    $nota_juego,
    $reseña,
    $fecha_inicio,
    $fecha_finalizacion,
    $veces_jugado,
    $id_usuario,
    $id_juego
);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Registro modificado correctamente."]);
} else {
    echo json_encode(["success" => false, "message" => "Error al insertar: " . $stmt->error]);
}

// Cerrar la conexión
$stmt->close();
$conn->close();