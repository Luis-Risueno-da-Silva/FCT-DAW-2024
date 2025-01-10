-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-01-2025 a las 11:54:57
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `baul_juegos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juegos`
--

CREATE TABLE `juegos` (
  `id_usuario` int(11) NOT NULL,
  `id_juego` int(11) NOT NULL,
  `nombre_juego` varchar(255) NOT NULL,
  `imagen_juego` varchar(255) NOT NULL,
  `estado_juego` varchar(255) NOT NULL,
  `nota_juego` decimal(3,2) DEFAULT NULL CHECK (`nota_juego` between 0 and 5),
  `reseña` text DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_finalizacion` date DEFAULT NULL,
  `veces_jugado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `juegos`
--

INSERT INTO `juegos` (`id_usuario`, `id_juego`, `nombre_juego`, `imagen_juego`, `estado_juego`, `nota_juego`, `reseña`, `fecha_inicio`, `fecha_finalizacion`, `veces_jugado`) VALUES
(16, 3328, 'The Witcher 3: Wild Hunt', 'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg', 'planeado jugar', '0.00', '', '0000-00-00', '0000-00-00', 0),
(16, 5679, 'The Elder Scrolls V: Skyrim', 'https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg', 'abandonado', '0.00', 'No hubo interés', '0000-00-00', '0000-00-00', 0),
(16, 4200, 'Portal 2', 'https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d281c9252a.jpg', 'jugando', '0.00', '', '0000-00-00', '0000-00-00', 0),
(16, 3498, 'Grand Theft Auto V', 'https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg', 'terminado', '5.00', '', '0000-00-00', '0000-00-00', 0),
(18, 3498, 'Grand Theft Auto V', 'https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg', 'terminado', '4.00', '', '0000-00-00', '0000-00-00', 0),
(18, 3328, 'The Witcher 3: Wild Hunt', 'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg', 'jugando', '0.00', '', '0000-00-00', '0000-00-00', 0),
(18, 4200, 'Portal 2', 'https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d281c9252a.jpg', 'planeado jugar', '0.00', '', '0000-00-00', '0000-00-00', 0),
(18, 3439, 'Life is Strange', 'https://media.rawg.io/media/games/562/562553814dd54e001a541e4ee83a591c.jpg', 'abandonado', '0.00', '', '0000-00-00', '0000-00-00', 0),
(20, 3497, 'Far Cry 4', 'https://media.rawg.io/media/games/b39/b396dac1f3e0f538841aa0355dd066d3.jpg', 'terminado', '5.00', 'Una buena secuela en la franquicia.', '2024-10-05', '2024-11-03', 1),
(18, 28202, 'Wolfenstein II: The New Colossus', 'https://media.rawg.io/media/games/a0e/a0ef08621301a1eab5e04fa5c96978fa.jpeg', 'terminado', '5.00', '', '0000-00-00', '0000-00-00', 0),
(16, 1358, 'Papers, Please', 'https://media.rawg.io/media/games/6d3/6d33014a4ed48a19c30a77ead5a0f62e.jpg', 'terminado', '5.00', 'Gran juego', '2024-12-01', '2024-12-08', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `correo_electronico` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `privacidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `correo_electronico`, `contraseña`, `privacidad`) VALUES
(16, 'Fernando', 'fernando@fernando.com', 'd90725543ccd3e861ca04a9f9eea9c206c66c5bcfad7185fc96b032f12a304f9', 1),
(17, 'Pedro', 'pedro@pedro.com', 'd90725543ccd3e861ca04a9f9eea9c206c66c5bcfad7185fc96b032f12a304f9', 1),
(18, 'B.-J.', 'bj@gamil.com', 'd90725543ccd3e861ca04a9f9eea9c206c66c5bcfad7185fc96b032f12a304f9', 1),
(20, 'Arturo', 'arturo@gmail.com', 'd90725543ccd3e861ca04a9f9eea9c206c66c5bcfad7185fc96b032f12a304f9', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `juegos`
--
ALTER TABLE `juegos`
  ADD KEY `fk_id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `juegos`
--
ALTER TABLE `juegos`
  ADD CONSTRAINT `fk_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
