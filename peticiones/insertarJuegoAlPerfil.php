<?php

include "../db/db_connection_Baul_Juegos.php";

// Obtener datos por POST
$id_usuario = $_POST["id_usuario"];
$id_juego = $_POST["id_juego"];
$nombre_juego = $_POST["nombre_juego"];
$imagen_juego = $_POST["imagen_juego"];
$estado_juego = $_POST["estado_juego"];
$nota_juego = $_POST["nota_juego"];
$reseña = $_POST["reseña"];
$fecha_inicio = $_POST["fecha_inicio"];
$fecha_finalizacion = $_POST["fecha_finalizacion"];
$veces_jugado = $_POST["veces_jugado"];

// Preparar y ejecutar la consulta de forma segura
$stmt = $conn->prepare("INSERT INTO juegos (id_usuario, id_juego, nombre_juego, imagen_juego, estado_juego, nota_juego, reseña, fecha_inicio, fecha_finalizacion, veces_jugado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param(
    "ssssssssss",
    $id_usuario,
    $id_juego,
    $nombre_juego,
    $imagen_juego,
    $estado_juego,
    $nota_juego,
    $reseña,
    $fecha_inicio,
    $fecha_finalizacion,
    $veces_jugado
);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Registro insertado correctamente."]);
} else {
    echo json_encode(["success" => false, "message" => "Error al insertar: " . $stmt->error]);
}

// Cerrar la conexión
$stmt->close();
$conn->close();
