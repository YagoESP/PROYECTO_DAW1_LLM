-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3307
-- Tiempo de generación: 18-04-2026 a las 16:10:53
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pccomponentes`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carts`
--

CREATE TABLE `carts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `total` decimal(10,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart_items`
--

CREATE TABLE `cart_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cart_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `parent_category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `parent_category_id`, `created_at`, `updated_at`) VALUES
(1, 'Componentes', NULL, '2026-04-17 06:12:41', '2026-04-17 06:12:41'),
(2, 'CPU', 1, '2026-04-17 06:12:41', '2026-04-17 06:12:41'),
(3, 'RAM', 1, '2026-04-17 06:12:41', '2026-04-17 06:12:41'),
(4, 'PlacaBase', 1, '2026-04-17 06:12:41', '2026-04-17 06:12:41'),
(5, 'TarjetaGrafica', 1, '2026-04-17 06:12:41', '2026-04-17 06:12:41'),
(6, 'FuenteDeAlimentacion', 1, '2026-04-17 06:12:41', '2026-04-17 06:12:41'),
(7, 'Ordenadores', NULL, '2026-04-17 06:12:41', '2026-04-17 06:12:41'),
(8, 'Sobremesa', 7, '2026-04-17 06:12:41', '2026-04-17 06:12:41'),
(9, 'Portatil', 7, '2026-04-17 06:12:41', '2026-04-17 06:12:41'),
(10, 'Perifericos', NULL, '2026-04-17 06:12:41', '2026-04-17 06:12:41'),
(11, 'Teclado', 10, '2026-04-17 06:12:41', '2026-04-17 06:12:41'),
(12, 'Raton', 10, '2026-04-17 06:12:41', '2026-04-17 06:12:41'),
(13, 'Impresora', 10, '2026-04-17 06:12:41', '2026-04-17 06:12:41'),
(14, 'Monitor', 10, '2026-04-17 06:12:41', '2026-04-17 06:12:41'),
(15, 'Sonido', 10, '2026-04-17 06:12:41', '2026-04-17 06:12:41'),
(16, 'Consolas y videojuegos', NULL, '2026-04-17 06:12:41', '2026-04-17 06:12:41'),
(17, 'Nintendo', 16, '2026-04-17 06:12:41', '2026-04-17 06:12:41'),
(18, 'PlayStation', 16, '2026-04-17 06:12:41', '2026-04-17 06:12:41'),
(19, 'Xbox', 16, '2026-04-17 06:12:41', '2026-04-17 06:12:41'),
(20, 'Moviles y tablets', NULL, '2026-04-17 06:12:41', '2026-04-17 06:12:41'),
(21, 'Movil', 20, '2026-04-17 06:12:41', '2026-04-17 06:12:41'),
(22, 'Tablet', 20, '2026-04-17 06:12:41', '2026-04-17 06:12:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_04_14_160701_create_categories_table', 1),
(5, '2026_04_14_160702_create_products_table', 1),
(6, '2026_04_14_160703_create_customers_table', 1),
(7, '2026_04_14_160704_create_carts_table', 1),
(8, '2026_04_14_160705_create_cart_items_table', 1),
(9, '2026_04_14_165042_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount` decimal(5,2) NOT NULL DEFAULT 0.00,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `category_id`, `price`, `discount`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Sony PlayStation 5 Slim Chasis E', 18, 649.99, 0.00, 'La consola PS5® hace posibles nuevas formas de juego que jamás habías imaginado. Experimenta tiempos de carga ultrarrápidos con la SSD de alta velocidad, una inmersión más profunda gracias a la retroalimentación háptica, gatillos adaptativos y Audio 3D2, además de una nueva generación de increíbles juegos de PlayStation®.', '2026-04-17 06:12:42', '2026-04-17 07:35:21'),
(2, 'HP DeskJet 2820e Multifunción Color WiFi Blanca', 13, 48.28, 0.19, 'Maximiza tu eficiencia con la multifunción HP DeskJet 2820e, diseñada para ofrecer impresión, escaneado y copiado profesional en cualquier entorno doméstico o pequeña oficina.', '2026-04-17 06:12:42', '2026-04-17 07:37:43'),
(3, 'Memoria RAM Kingston FURY Beast DDR4 3200 MHz 16GB 2x8GB CL16', 3, 151.16, 0.00, 'La memoria para PC FURY Beast DDR4 de Kingston ofrece un potente aumento de rendimiento para juegos, edición de vídeo y renderización con velocidades de hasta 3733 MHz. Esta rentable actualización está disponible en velocidades de 2666 MHz a 3733 MHz, con latencias de CL15 a 19, capacidades de 4 GB a 32 GB en módulos individuales y de 8 GB a 128 GB en kits. Su overclocking automático Plug N Play a velocidades de 2666 MHz está disponible en Intel XMP y Ryzen. El módulo FURY Beast DDR4 se mantiene fresco gracias a su elegante y delgado disipador de calor. Probada al 100% y garantizada de por vida, esta actualización es muy fácil y sin problemas para tu sistema Intel o AMD.', '2026-04-17 06:12:42', '2026-04-17 07:39:14'),
(4, 'Sony PlayStation 5 Pro con Nuevo Dualsense', 18, 899.99, 0.00, 'Con PlayStation®5 Pro y su nuevo y revisado mando Dualsense, los mejores creadores del mundo pueden potenciar sus juegos con características increíbles, como trazado de rayos avanzado, una claridad de imagen súper nítida en televisores 4K y altas velocidades de fotogramas*. Eso te permitirá jugar a los títulos de PS5® con los mejores gráficos jamás vistos en una consola PlayStation®. Y, con 2TB de almacenamiento SSD incluido, tus juegos favoritos estarán siempre listos para llevarte a tu próxima gran aventura.', '2026-04-17 06:12:42', '2026-04-17 07:41:08'),
(5, 'Nilait Aera Auriculares Inalámbricos 40mm BT 5.4 Cancelación de Ruido ANC 4 Mic Negros', 15, 59.99, 0.33, 'Hemos creado nuestras propias marcas para eliminar intermediarios, ajustar costes y controlar la calidad de principio a fin con un objetivo claro: ofrecerte rendimiento, fiabilidad y diseño al mejor precio.', '2026-04-17 06:12:42', '2026-04-17 07:45:00'),
(6, 'Tempest Ethereal Black Edition Auriculares Gaming Wireless Negro', 15, 19.99, 0.50, 'Hemos creado nuestras propias marcas para eliminar intermediarios, ajustar costes y controlar la calidad de principio a fin con un objetivo claro: ofrecerte rendimiento, fiabilidad y diseño al mejor precio.', '2026-04-17 06:12:42', '2026-04-17 07:47:24'),
(7, 'Fuente Alimentación MSI MAG A650BN 650W 80 Plus Bronze', 6, 57.99, 0.00, 'MAG A650BN proporciona a los jugadores una opción de fuente de alimentación básica segura, confiable y eficiente.', '2026-04-17 06:12:42', '2026-04-17 07:49:49'),
(8, 'Owlotech MS900 Ratón Wireless con Rueda Lateral 2.4GHz/Bluetooth Clics Silenciosos 4800DPI Negro', 12, 34.99, 0.28, 'Hemos creado nuestras propias marcas para eliminar intermediarios, ajustar costes y controlar la calidad de principio a fin con un objetivo claro: ofrecerte rendimiento, fiabilidad y diseño al mejor precio.', '2026-04-17 06:12:42', '2026-04-17 07:54:28'),
(9, 'Placa Base Gigabyte B550M K Rev. 1.0', 4, 94.99, 0.26, 'Lleva tu ordenador al siguiente nivel de rendimiento y estabilidad con la Gigabyte B550M K, la opción fiable para creadores, profesionales y gamers exigentes en busca de una plataforma potente y escalable.', '2026-04-17 06:12:42', '2026-04-17 14:42:25'),
(10, 'Memoria RAM Forgeon Cyclone PLUS V2 DDR4 3200 MHz 32GB 2x16GB CL16', 3, 328.99, 0.20, 'Hemos creado nuestras propias marcas para eliminar intermediarios, ajustar costes y controlar la calidad de principio a fin con un objetivo claro: ofrecerte rendimiento, fiabilidad y diseño al mejor precio.', '2026-04-17 06:12:42', '2026-04-17 15:05:12'),
(11, 'Tablet Samsung Galaxy Tab A9 Plus WiFi 11\" 8GB 256GB Gris', 22, 499.00, 0.52, 'Rendimiento profesional y entretenimiento avanzado en una tablet ligera y versátil.', '2026-04-17 06:12:42', '2026-04-17 15:48:02'),
(12, 'Nintendo Switch Lite Coral', 17, 175.00, 0.00, 'Nintendo presenta Nintendo Switch Lite, un dispositivo enfocado al juego portátil ideal para los jugadores que no se están quietos. Nintendo Switch Lite es la nueva incorporación a la familia Nintendo Switch: se trata de una consola compacta y ligera que se puede llevar a cualquier sitio con facilidad.', '2026-04-17 06:12:42', '2026-04-17 08:59:47'),
(13, 'ASUS ROG XBOX Ally RC73YA-NH002W Consola Portátil 7\" AMD Ryzen Z2 A 16GB 512GB SSD', 19, 599.00, 0.25, 'Experiencia de consola y libertad de PC en tus manos. ROG Xbox Ally revoluciona el juego portátil: integra lo mejor del entorno Xbox, optimizado para mandos y controles analógicos, y toda la flexibilidad de Windows 11. Juega títulos AAA, indies o emuladores en una pantalla táctil Full HD de 7 pulgadas y 120 Hz.', '2026-04-17 06:12:42', '2026-04-17 16:18:59'),
(14, 'Procesador Intel Core Ultra 7 265K IA Integrada 3.3/5.5GHz Box', 2, 325.01, 0.17, 'Experimenta el siguiente nivel de potencia de procesamiento y capacidades de IA en tu equipo con el Intel Core Ultra 7 265K, pensado para quienes desafían los límites del rendimiento.', '2026-04-17 06:12:42', '2026-04-17 08:04:31'),
(15, 'Placa Base MSI B760 GAMING PLUS WIFI Intel B760 LGA1700 DDR4 ATX WiFi 6 PCIe 4.0', 4, 147.95, 0.00, 'Rinde al máximo nivel y olvídate de limitaciones gracias a la MSI B760 GAMING PLUS WIFI DDR4, la base definitiva para cualquier setup gaming o profesional que exige velocidad y conectividad.', '2026-04-17 06:12:42', '2026-04-17 14:44:09'),
(16, 'PcCom Essential MK20 Combo Teclado + Ratón Wireless con Copilot Negro', 11, 17.99, 0.22, 'Hemos creado nuestras propias marcas para eliminar intermediarios, ajustar costes y controlar la calidad de principio a fin con un objetivo claro: ofrecerte rendimiento, fiabilidad y diseño al mejor precio.', '2026-04-17 06:12:42', '2026-04-17 16:08:45'),
(17, 'Portátil PcCom Revolt 5060 Intel Core i7-14650HX 16\" /16GB/500GB/Windows Home', 9, 1799.99, 0.27, 'Hemos creado nuestras propias marcas para eliminar intermediarios, ajustar costes y controlar la calidad de principio a fin con un objetivo claro: ofrecerte rendimiento, fiabilidad y diseño al mejor precio.', '2026-04-17 06:12:42', '2026-04-17 14:54:45'),
(18, 'ASUS ROG XBOX Ally X RC73XA-NH011W Consola Portátil 7\" AMD Ryzen Z2 AI Extreme 24GB 1TB SSD W11 Negra', 19, 999.00, 0.00, 'Lidera cualquier partida con la ASUS ROG Ally X RC73XA-NH011W: potencia y portabilidad para gaming sin límites, con la experiencia premium de consola y flexibilidad total de Windows.', '2026-04-17 06:12:42', '2026-04-17 16:19:58'),
(19, 'Owlotech DeskBuds Max Auriculares Diadema con Micrófono Negro', 15, 22.99, 0.52, 'Hemos creado nuestras propias marcas para eliminar intermediarios, ajustar costes y controlar la calidad de principio a fin con un objetivo claro: ofrecerte rendimiento, fiabilidad y diseño al mejor precio.', '2026-04-17 06:12:42', '2026-04-17 15:33:30'),
(20, 'Portátil Acer Aspire Go 15,6\" AMD Ryzen 5 7430U 8GB 512GB SSD Radeon Graphics', 9, 499.00, 0.14, 'Optimiza tu productividad diaria con el Acer Aspire Go 15,6\" AMD Ryzen 5, un portátil diseñado para quienes buscan eficiencia, conectividad y fiabilidad en cada tarea.', '2026-04-17 06:12:42', '2026-04-17 15:02:41'),
(21, 'Tempest Calamity Combo 3 en 1 Gaming Teclado + Ratón + Alfombrilla', 11, 22.99, 0.26, 'Hemos creado nuestras propias marcas para eliminar intermediarios, ajustar costes y controlar la calidad de principio a fin con un objetivo claro: ofrecerte rendimiento, fiabilidad y diseño al mejor precio.', '2026-04-17 06:12:42', '2026-04-17 16:10:10'),
(22, 'Ratón Logitech MX Master 4 Inalámbrico RF + Bluetooth 8000 DPI Grafito', 12, 129.00, 0.00, 'Impulsa tu productividad con el ratón Logitech MX Master 4 inalámbrico 8000 DPI grafito: desbloquea un nuevo nivel de control, precisión y fluidez en cada tarea avanzada.', '2026-04-17 06:12:42', '2026-04-17 15:14:44'),
(23, 'Procesador AMD Ryzen 5 5500 3.6GHz Box', 2, 189.00, 0.57, 'Cuando cuentas con la arquitectura de procesadores de escritorio más avanzada del mundo para jugadores y creadores de contenido, las posibilidades son infinitas. Ya sea que juegues los juegos más recientes, diseñes el próximo rascacielos o proceses datos, necesitas un procesador poderoso que pueda dar respuesta a todas estas demandas, y más. Sin lugar a dudas, los procesadores para computadoras de escritorio AMD Ryzen™ serie 5000 elevan el nivel de expectativa para jugadores y artistas por igual.', '2026-04-17 06:12:42', '2026-04-17 07:57:37'),
(24, 'Owlotech K500 Teclado Negro', 11, 19.99, 0.00, 'Hemos creado nuestras propias marcas para eliminar intermediarios, ajustar costes y controlar la calidad de principio a fin con un objetivo claro: ofrecerte rendimiento, fiabilidad y diseño al mejor precio.', '2026-04-17 06:12:42', '2026-04-17 16:11:08'),
(25, 'Tarjeta Gráfica Gigabyte GeForce RTX 5060 WINDFORCE MAX OC 8GB GDDR7 Reflex 2 RTX AI DLSS4', 5, 377.63, 0.12, 'La Gigabyte GeForce RTX 5060 WINDFORCE MAX OC redefine el rendimiento gráfico para gamers y creadores exigentes. Equipada con arquitectura NVIDIA Blackwell y 3840 núcleos CUDA, ofrece una experiencia fluida en juegos AAA y aplicaciones profesionales, permitiendo aprovechar tecnologías de Ray Tracing de cuarta generación y DLSS 4 para multiplicar los FPS mediante IA sin sacrificar calidad visual.', '2026-04-17 06:12:42', '2026-04-17 15:56:33'),
(26, 'Samsung Galaxy A16 4G 128GB 4GB 6,7\" Negro Dual SIM', 21, 299.00, 0.60, 'El Samsung Galaxy A16 está pensado para quien quiere un móvil 4G equilibrado, con una experiencia visual de gama superior y un enfoque claro en autonomía y seguridad. Su panel Super AMOLED FHD+ de 6,7\" con 90 Hz ofrece negros profundos, buen contraste y desplazamiento suave: ideal para streaming, lectura prolongada, redes sociales y trabajo en movilidad con varias apps en pantalla.', '2026-04-17 06:12:42', '2026-04-17 08:42:08'),
(27, 'Canon PIXMA TS3750i Impresora Multifunción Color WiFi', 13, 50.99, 0.00, 'Imprime, copia y escanea con nuestra impresora multifunción de nivel básico para el hogar y la oficina, compatible con PIXMA Print Plan, con lo que recibirás tintas directamente en tu puerta para que no quedarte nunca sin tinta. La PIXMA serie TS3750i es muy fácil de configurar y usar.', '2026-04-17 06:12:42', '2026-04-17 08:21:23'),
(28, 'Apple iPhone 15 128GB Negro Libre', 21, 859.00, 0.25, 'El Apple iPhone 15 128 GB Negro está diseñado para quienes buscan un smartphone premium, compacto y potente. Su pantalla OLED Super Retina XDR de 6,1 pulgadas ofrece una experiencia visual sobresaliente, con colores intensos, negros profundos y hasta 2.000 nits de brillo máximo en exteriores.', '2026-04-17 06:12:42', '2026-04-17 08:47:13'),
(29, 'Tarjeta Gráfica MSI GeForce RTX 5060 VENTUS 2X OC 8GB GDDR7 Reflex 2 RTX AI DLSS4', 5, 360.90, 0.05, 'La MSI GeForce RTX 5060 VENTUS 2X OC 8GB GDDR7 Reflex 2 RTX AI DLSS4 es la nueva referencia en tarjetas gráficas gaming y creación de contenido, combinando la arquitectura NVIDIA Blackwell, núcleos Tensor de quinta generación y tecnologías de IA para ofrecer rendimiento y eficiencia excepcionales.', '2026-04-17 06:12:42', '2026-04-17 15:58:10'),
(30, 'Forgeon General Auriculares Gaming Inalámbricos PC/PS4/PS5/Xbox/Xbox X/Switch Negros', 15, 104.99, 0.23, 'Hemos creado nuestras propias marcas para eliminar intermediarios, ajustar costes y controlar la calidad de principio a fin con un objetivo claro: ofrecerte rendimiento, fiabilidad y diseño al mejor precio.', '2026-04-17 06:12:42', '2026-04-17 15:34:35'),
(31, 'ASUS PRIME AMD Radeon RX 9070 XT OC 16GB GDDR6 FSR 4', 5, 749.90, 0.06, 'La ASUS PRIME Radeon RX 9070 XT OC ofrece un rendimiento de alto nivel para gaming 4K, edición profesional y tareas de IA, gracias a sus 16GB GDDR6 y arquitectura AMD RDNA 3. Su triple ventilador Axial-tech y diseño de 2,5 ranuras garantizan refrigeración premium y compatibilidad con la mayoría de chasis.', '2026-04-17 06:12:42', '2026-04-17 16:01:19'),
(32, 'Placa Base MSI B550M PRO-VDH WIFI', 4, 109.99, 0.00, 'La serie PRO ayuda a los usuarios a trabajar de manera más inteligente al brindar una experiencia eficiente y productiva. Con una funcionalidad estable y un ensamblaje de alta calidad, las placas base de la serie PRO proporcionan no solo flujos de trabajo profesionales optimizados, sino también menos resolución de problemas y longevidad.', '2026-04-17 06:12:42', '2026-04-17 14:46:38'),
(33, 'Procesador AMD Ryzen 5 9600X 3.9/5.4GHz', 2, 227.20, 0.15, 'Alcanza nuevos niveles de rendimiento en gaming, productividad y creación de contenido con el AMD Ryzen 5 9600X, diseñado para entusiastas que buscan equilibrio y vanguardia en sus equipos.', '2026-04-17 06:12:42', '2026-04-17 08:00:14'),
(34, 'PcCom Imperial AMD Ryzen 7 5700X / 32GB / 1TB SSD / RTX 5070 / Windows 11 Home', 8, 1999.00, 0.20, 'Hemos creado nuestras propias marcas para eliminar intermediarios, ajustar costes y controlar la calidad de principio a fin con un objetivo claro: ofrecerte rendimiento, fiabilidad y diseño al mejor precio.', '2026-04-17 06:12:42', '2026-04-17 15:17:31'),
(35, 'PcCom Ready AMD Ryzen 7 5800X / 32GB / 1TB SSD / RTX 5060', 8, 1699.00, 0.25, 'Hemos creado nuestras propias marcas para eliminar intermediarios, ajustar costes y controlar la calidad de principio a fin con un objetivo claro: ofrecerte rendimiento, fiabilidad y diseño al mejor precio.', '2026-04-17 06:12:42', '2026-04-17 15:19:53'),
(36, 'Nintendo Switch Lite Azul Turquesa', 17, 175.00, 0.00, 'Nintendo presenta Nintendo Switch Lite, un dispositivo enfocado al juego portátil ideal para los jugadores que no se están quietos. Nintendo Switch Lite es la nueva incorporación a la familia Nintendo Switch: se trata de una consola compacta y ligera que se puede llevar a cualquier sitio con facilidad.', '2026-04-17 06:12:42', '2026-04-17 09:00:41'),
(37, 'HP Color LaserJet Pro MFP 3302sdw Multifunción Láser Color WiFi Dúplex', 13, 369.00, 0.18, 'Impresión a doble cara fiable y de gran calidad, con escaneado y copia. Diseñada para equipos de trabajo empresariales que necesitan un rendimiento profesional con impresiones, escaneados y copias en color a doble cara rápidos y de gran calidad, además de una fiabilidad galardonada en un diseño compacto.', '2026-04-17 06:12:42', '2026-04-17 08:22:55'),
(38, 'Microsoft Xbox Series S 512GB Blanca', 19, 399.99, 0.00, 'Rendimiento de nueva generación en la Xbox más pequeña de la historia. La nueva generación de videojuegos ofrece nuestra biblioteca de lanzamientos digitales más grande a la Xbox más pequeña de la historia. Con mundos más dinámicos, tiempos de carga más rápidos y la adición de Xbox Game Pass (se vende por separado), la Xbox Series S totalmente digital es el mejor valor disponible en el mundo de los videojuegos.', '2026-04-17 06:12:42', '2026-04-17 16:22:34'),
(39, 'Portátil MSI Cyborg 15 B2RWFKG-201XES Intel Core 7 240H 32GB DDR5 1TB SSD RTX 5060 15.6\"', 9, 1999.00, 0.42, 'El MSI Cyborg 15 B2RFWKG redefine el estándar de los portátiles gaming y creativos. Equipado con procesador Intel Core 7 240H y 32GB DDR5, ofrece un rendimiento multitarea extremo para gaming AAA, edición de vídeo, renderizado 3D y desarrollo avanzado.', '2026-04-17 06:12:42', '2026-04-17 14:59:54'),
(40, 'Newskill Aton V2 Black Auriculares Gaming Inalámbricos RGB Bluetooth 5.0 Multiplataforma Negros', 15, 119.95, 0.27, 'Los Aton V2 combinan un diseño ergonómico y ligero con materiales transpirables y una diadema equilibrada que reparte el peso de forma uniforme. Las almohadillas en tejido técnico garantizan frescura incluso en las partidas más intensas.', '2026-04-17 06:12:42', '2026-04-17 15:36:17'),
(41, 'Procesador Intel Core i5-14600K 3.5/5.4GHz Box', 2, 314.99, 0.08, 'El procesador Intel Core i5 de la línea LGA1700 es una potente unidad de procesamiento que destaca por su rendimiento excepcional y versatilidad. Con 14 núcleos y 20 hilos, ofrece un procesamiento multitarea excepcional y un rendimiento fluido en una amplia variedad de aplicaciones. La frecuencia de 3500 MHz proporciona un funcionamiento rápido y eficiente, mientras que el generoso caché L3 de 24576 KB mejora la velocidad de acceso a datos importantes. Este procesador pertenece a la serie 14ª generación, y su multiplicador desbloqueado brinda flexibilidad a los entusiastas del overclocking.', '2026-04-17 06:12:42', '2026-04-17 08:06:06'),
(42, 'Tarjeta Gráfica PNY GeForce RTX 5070 Ti Overclocked Triple Fan 16GB GDDR7 Reflex 2 RTX AI DLSS4', 5, 1049.00, 0.06, 'Cambia el juego. Con tecnología de NVIDIA Blackwell, las GPU GeForce RTX™ serie 50 ofrecen capacidades revolucionarias a jugadores y creadores. Equipada con una increíble potencia de IA, la RTX serie 50 abre el camino hacia nuevas experiencias y ofrece fidelidad gráfica de siguiente nivel. Multiplica el rendimiento con NVIDIA DLSS 4, genera imágenes a una velocidad sin precedentes y libera tu creatividad con NVIDIA Studio.', '2026-04-17 06:12:42', '2026-04-17 16:02:51'),
(43, 'Procesador Intel Core i5-12400 2.5 GHz', 2, 250.00, 0.15, 'Procesadores Intel® Core™ de 12ª generación: una generación como ninguna otra antes. Con una nueva arquitectura híbrida de rendimiento sin precedentes, los procesadores Intel® Core™ de 12ª generación ofrecen una combinación única de núcleos de rendimiento y eficiencia (núcleo P y núcleo E). Y eso significa gozar de rendimiento en el mundo real, un resultado escalado intuitivamente para adaptarse a cualquier cosa que estés haciendo.', '2026-04-17 06:12:42', '2026-04-17 08:07:35'),
(44, 'Xiaomi REDMI 15 5G 8GB 256GB 6.9\" Negro Medianoche', 21, 144.62, 0.00, 'El Xiaomi REDMI 15 5G destaca por su batería de 7000 mAh que garantiza jornadas completas de uso intensivo sin preocuparte por la carga. Su pantalla IPS FHD+ de 6,9 pulgadas y 144 Hz ofrece una experiencia visual fluida y envolvente, ideal para gaming, edición de imágenes o consumo multimedia profesional.', '2026-04-17 06:12:42', '2026-04-17 08:49:17'),
(45, 'Nintendo Switch Azul Neón/Rojo Neón V3', 17, 299.00, 0.00, 'Lleva tu experiencia de juego portátil al siguiente nivel con la Nintendo Switch V3, la consola que libera el gaming en cualquier lugar con gráficos de alta calidad y máxima versatilidad.', '2026-04-17 06:12:42', '2026-04-17 09:01:59'),
(46, 'Xiaomi REDMI Note 14 5G 8GB 256GB 6.67\" Negro Medianoche', 21, 299.99, 0.33, 'El Xiaomi REDMI Note 14 5G está diseñado para usuarios que buscan rendimiento, fotografía avanzada y conectividad total. Su cámara triple de 108 MP con OIS y EIS permite capturar imágenes nítidas, estables y con gran detalle, incluso en condiciones de baja luz, gracias a algoritmos RAW y funciones de IA como AI Erase y AI Sky.', '2026-04-17 06:12:42', '2026-04-17 08:51:04'),
(47, 'Fuente Alimentación Forgeon Reactor 850W Cybenetics Platinum ATX 3.1 PCIe 5.1 Full Modular', 6, 149.99, 0.41, 'Fuente Alimentación Forgeon Reactor 850W Cybenetics Platinum ATX 3.1 PCIe 5.1 Full Modular Fuente de Alimentación Negra', '2026-04-17 06:12:42', '2026-04-17 08:10:19'),
(48, 'Xbox Series X Digital Edition 1TB Blanca', 19, 644.17, 0.00, 'La Xbox más rápida y potente de la historia. Sumérgete en juegos como Avowed, Indiana Jones and the Great Circle, Call of Duty: Black Ops 6 y muchos más que cobran vida en la Xbox Series X. Disfruta de una velocidad y rendimiento de nueva generación con Xbox Velocity Architecture, impulsada por un SSD personalizado de 1TB y software integrado.', '2026-04-17 06:12:42', '2026-04-17 16:23:52'),
(49, 'Tarjeta Gráfica MSI GeForce RTX 5080 VENTUS 3X OC 16GB GDDR7 Reflex 2 RTX AI DLSS4', 5, 1329.90, 0.00, 'VENTUS se centra en lo esencial para afrontar cualquier desafío. Su eficiente solución térmica está envuelta en una carcasa resistente con una estética neutra, lo que permite que esta elegante tarjeta gráfica se integre perfectamente en cualquier sistema.', '2026-04-17 06:12:42', '2026-04-17 16:04:15'),
(50, 'PcCom Essential M20 Ratón Wireless 1000DPI Gris', 12, 9.99, 0.10, 'Hemos creado nuestras propias marcas para eliminar intermediarios, ajustar costes y controlar la calidad de principio a fin con un objetivo claro: ofrecerte rendimiento, fiabilidad y diseño al mejor precio.', '2026-04-17 06:12:42', '2026-04-17 15:09:36'),
(51, 'PcCom Work Intel Core i7-12700 / 32GB / 1TB SSD / Windows 11 Pro V3', 8, 1279.00, 0.23, 'Hemos creado nuestras propias marcas para eliminar intermediarios, ajustar costes y controlar la calidad de principio a fin con un objetivo claro: ofrecerte rendimiento, fiabilidad y diseño al mejor precio.', '2026-04-17 06:12:42', '2026-04-17 15:22:02'),
(52, 'Ozone Alliance Teclado Gaming Retroiluminado', 11, 39.90, 0.30, 'El teclado Ozone Alliance es el resultado perfecto de la integración de lo mejor de los teclados mecánicos y de membrana. Robusto, fabricado con materiales de gran calidad, desde su cable trenzado pasando por cada uno de sus switches, Alliance ofrece máximo confort, convirtiéndose en el mejor compañero en cada partida.', '2026-04-17 06:12:42', '2026-04-17 16:13:03'),
(53, 'Apple iPad 2025 11\" WiFi 128GB Rosa', 22, 399.00, 0.07, 'Disfruta de una experiencia visual envolvente y un rendimiento ultrarrápido con el Apple iPad WiFi 11\" 128GB Rosa. Su pantalla Liquid Retina y el chip A16 ofrecen fluidez y precisión para profesionales, estudiantes y creadores.', '2026-04-17 06:12:42', '2026-04-17 15:49:17'),
(54, 'Apple iPhone 15 256GB Negro Libre', 21, 989.00, 0.24, 'El Apple iPhone 15 destaca por su pantalla Super Retina XDR OLED de 6,1 pulgadas, que ofrece una experiencia visual envolvente con colores vibrantes y negros profundos, ideal para profesionales y entusiastas del contenido multimedia.', '2026-04-17 06:12:42', '2026-04-17 08:53:51'),
(55, 'PC Dell Pro QVS1260 Intel Core i5-14400 16GB 1TB SSD UHD Graphics 730', 8, 855.24, 0.00, 'Optimiza el rendimiento de tu empresa con el Dell Pro QVS1260 Intel Core i5: elevado desempeño, seguridad robusta y máxima eficiencia en un formato compacto.', '2026-04-17 06:12:42', '2026-04-17 15:23:17'),
(56, 'Epson Expression Home XP-2200 Impresora Multifunción Color WiFi', 13, 72.00, 0.09, 'Si buscas una impresora económica, moderna e intuitiva, la XP-2200 es la mejor opción. También es compacta y produce impresiones claras y vibrantes. Imprimir con dispositivos sobre la marcha es fácil con Wi-Fi, Wi-Fi Direct y una gama de aplicaciones compatibles de Epson.', '2026-04-17 06:12:42', '2026-04-17 08:24:38'),
(57, 'PcCom Work Intel Core i5-12400 / 16GB / 500GB SSD', 8, 729.00, 0.19, 'Hemos creado nuestras propias marcas para eliminar intermediarios, ajustar costes y controlar la calidad de principio a fin con un objetivo claro: ofrecerte rendimiento, fiabilidad y diseño al mejor precio.', '2026-04-17 06:12:42', '2026-04-17 15:25:03'),
(58, 'Monitor Philips 1000 Series 27E1N1100A/00 27\" LED IPS FullHD 120Hz', 14, 109.90, 0.18, 'Disfruta de una experiencia visual fluida y precisa con el Monitor Philips 1000 Series 27E1N1100A/00, diseñado para quienes buscan rendimiento, comodidad y versatilidad en su escritorio. El dispositivo incluye soporte, cables HDMI y de corriente, y manual de usuario, eliminando la necesidad de comprar accesorios adicionales.', '2026-04-17 06:12:42', '2026-04-17 08:34:11'),
(59, 'Tarjeta Gráfica ASUS PRIME GeForce RTX 5070 OC 12GB GDDR7 Reflex 2 RTX AI DLSS4', 5, 779.00, 0.06, 'Arquitectura NVIDIA Blackwell y DLSS 4: Disfruta de gráficos de última generación, generación de frames por IA y trazado de rayos completo gracias a los núcleos Tensor y RT de última generación. Multiplica los FPS y la fluidez en juegos AAA y aplicaciones creativas.', '2026-04-17 06:12:42', '2026-04-17 16:06:21'),
(60, 'PC HP OMEN 16L TG03-0052ns AMD Ryzen 5 8400F 16GB 1TB SSD RTX 5060 Ti', 8, 1499.00, 0.16, 'Experimenta el máximo rendimiento gaming y creativo con el HP OMEN 16L TG03-0052ns, diseñado para usuarios exigentes que buscan potencia, velocidad y fiabilidad en cada sesión.', '2026-04-17 06:12:42', '2026-04-17 15:26:57'),
(61, 'Placa Base ASUS PRIME B550M-A/CSM', 4, 93.99, 0.11, 'La serie ASUS Prime está diseñada por expertos para liberar todo el potencial de la plataforma AMD Ryzen de tercera generación. Con un diseño de potencia robusto, soluciones integrales de enfriamiento y opciones de ajuste inteligentes, las tarjetas madre de la serie Prime B550 brindan a los usuarios diarios y a los constructores de PC una gama de opciones de ajuste de rendimiento a través de características intuitivas de software y firmware.', '2026-04-17 06:12:42', '2026-04-17 14:40:42'),
(62, 'Tablet Lenovo Tab 10,1\" WiFi 128GB 4GB Gris Luna altavoces duales', 22, 199.00, 0.20, 'La Lenovo Tab 10,1\" destaca por su diseño metálico premium y su ligereza, con solo 425 gramos y un grosor de 7,5 mm, facilitando su transporte y uso prolongado.', '2026-04-17 06:12:42', '2026-04-17 15:52:29'),
(63, 'PcCom Ready AMD Ryzen 7 5800X / 32GB / 1TB SSD / RTX 5060 Blanco', 8, 1919.00, 0.28, 'Hemos creado nuestras propias marcas para eliminar intermediarios, ajustar costes y controlar la calidad de principio a fin con un objetivo claro: ofrecerte rendimiento, fiabilidad y diseño al mejor precio.', '2026-04-17 06:12:42', '2026-04-17 15:29:51'),
(64, 'Fuente Alimentación Corsair RMe Series RM750e ATX 3.1 PCIe 5.1 750W Cybenetics 80 Plus Gold Modular', 6, 124.90, 0.31, 'Las fuentes de alimentación silenciosas totalmente modulares CORSAIR RMe Series proporcionan a su PC alimentación silenciosa y fiable con eficiencia Cybenetics Gold. Los cables modulares facilitan el ensamblaje de los PC, ya que solo tiene que conectar los cables que necesita el sistema.', '2026-04-17 06:12:42', '2026-04-17 08:12:26'),
(65, 'Owlotech Teralis Altavoces 2.0 Bluetooth 5.4 TWS 16W Negros', 15, 39.99, 0.24, 'Hemos creado nuestras propias marcas para eliminar intermediarios, ajustar costes y controlar la calidad de principio a fin con un objetivo claro: ofrecerte rendimiento, fiabilidad y diseño al mejor precio.', '2026-04-17 06:12:42', '2026-04-17 15:41:32'),
(66, 'Nintendo Switch OLED Blanca', 17, 339.99, 0.00, 'Redescubre tu forma de jugar con la Nintendo Switch OLED, diseñada para gamers exigentes que buscan rendimiento profesional en formato portátil.', '2026-04-17 06:12:42', '2026-04-17 09:03:42'),
(67, 'Nintendo Switch 2 7.9\" FullHD HDR 120Hz 256GB Magnetic Joy-Con Modo Ratón Azul/Rojo', 17, 469.00, 0.00, 'Juega en una pantalla más grande, de 1080p, o conecta la consola al televisor para jugar en una resolución de hasta 4K*. Gracias a la compatibilidad con el alto rango dinámico (HDR), la tasa de refresco variable (VRR) y una frecuencia de imágenes de hasta 120 fps, disfrutarás de colores nítidos e intensos, así como de partidas fluidas.', '2026-04-17 06:12:42', '2026-04-17 09:05:40'),
(68, 'Krom Kreator Teclado Mecánico Gaming RGB Hot Swap', 11, 34.90, 0.00, 'Krom Kreator es el teclado 60% que viene a revolucionar el mercado. Krom Kreator es un teclado gaming ultracompacto que incluye teclas de doble inyección, que te permitirá ganar espacio mientras te alzas con la victoria gracias a su formato 60%.', '2026-04-17 06:12:42', '2026-04-17 16:14:37'),
(69, 'Monitor MSI PRO MP243XW 23.8\" LED IPS FullHD 100Hz', 14, 119.00, 0.37, 'Optimiza tu espacio de trabajo y eleva tu productividad con el Monitor MSI PRO MP243XW. Su panel IPS de 23,8 pulgadas FullHD y tasa de refresco de 100 Hz ofrecen una experiencia visual fluida y precisa, perfecta para profesionales y entusiastas que buscan calidad y versatilidad en un formato compacto.', '2026-04-17 06:12:42', '2026-04-17 08:35:43'),
(70, 'Placa Base MSI MPG B550 GAMING PLUS', 4, 169.90, 0.50, 'La serie MPG saca lo mejor de los jugadores al permitir una expresión completa en color con control avanzado de iluminación RGB y sincronización. Experimente en otro nivel de personalización con una tira de LED frontal que proporciona notificaciones convenientes en el juego y en tiempo real. Con la serie MPG, transforme su equipo en el centro de atención y las mejores tablas de clasificación con estilo.', '2026-04-17 06:12:42', '2026-04-17 14:34:56'),
(71, 'Tablet Xiaomi REDMI Pad 2 WiFi 11\" 4GB 128GB Gris Grafito', 22, 199.99, 0.20, 'Experimenta una visualización envolvente y autonomía prolongada para trabajar y disfrutar sin límites.', '2026-04-17 06:12:42', '2026-04-17 15:53:40'),
(72, 'PcCom Essential BassLine Altavoces 2.1 11W Negros', 15, 19.99, 0.20, 'Hemos creado nuestras propias marcas para eliminar intermediarios, ajustar costes y controlar la calidad de principio a fin con un objetivo claro: ofrecerte rendimiento, fiabilidad y diseño al mejor precio.', '2026-04-17 06:12:42', '2026-04-17 15:38:52'),
(73, 'Sony PlayStation Portal', 18, 249.99, 0.12, 'Transforma tu experiencia de juego llevando la calidad de la consola PS5 a la palma de la mano. Con una pantalla LCD de 8\" Full HD a 60 fps, el Sony PlayStation Portal maximiza el detalle y la fluidez en títulos exigentes, permitiendo jornadas maratonianas sin fatiga visual gracias a su ergonomía avanzada y peso optimizado (540 g).', '2026-04-17 06:12:42', '2026-04-17 16:25:51'),
(74, 'Owlotech Q1 Micrófono Condensador Cardioide Negro', 15, 30.00, 0.33, 'Hemos creado nuestras propias marcas para eliminar intermediarios, ajustar costes y controlar la calidad de principio a fin con un objetivo claro: ofrecerte rendimiento, fiabilidad y diseño al mejor precio.', '2026-04-17 06:12:42', '2026-04-17 16:31:55'),
(75, 'Ozone Rec X50 Micrófono de Condensador Gaming Negro', 15, 49.90, 0.00, 'Completa tu set up con Ozone REC X50 y haz tus streamings de manera profesional gracias a este micrófono que conjuga un sonido de alta calidad con un diseño funcional, perfecto para lograr grabaciones de estudio profesionales en tus sesiones de streaming, podcast o locuciones.', '2026-04-17 06:12:42', '2026-04-17 16:32:58'),
(76, 'Apple iPhone 17 Pro 512 GB Naranja Cósmico Reacondicionado', 21, 1778.00, 0.15, 'El Apple iPhone 17 Pro es la referencia absoluta para usuarios expertos que buscan lo mejor en fotografía, rendimiento y experiencia móvil. Su estructura Unibody de aluminio forjado y el Ceramic Shield 2 garantizan máxima resistencia y durabilidad, mientras que la protección IP68 permite usarlo en entornos exigentes sin preocupaciones.', '2026-04-17 06:12:42', '2026-04-17 08:55:42'),
(77, 'PcCom Essential Altavoces 2.0 10W Negros', 15, 19.99, 0.15, 'Hemos creado nuestras propias marcas para eliminar intermediarios, ajustar costes y controlar la calidad de principio a fin con un objetivo claro: ofrecerte rendimiento, fiabilidad y diseño al mejor precio.', '2026-04-17 06:12:42', '2026-04-17 15:43:03'),
(78, 'Forgeon Vendetta Ratón Gaming RGB 16000DPI Negro', 12, 59.99, 0.33, 'Hemos creado nuestras propias marcas para eliminar intermediarios, ajustar costes y controlar la calidad de principio a fin con un objetivo claro: ofrecerte rendimiento, fiabilidad y diseño al mejor precio.', '2026-04-17 06:12:42', '2026-04-17 15:12:02'),
(79, 'Teclado NOX Lite Duo Combo inalámbrico Español con ratón y USB-C', 11, 23.99, 0.00, 'Aumenta tu productividad y confort con el Teclado NOX Lite Duo Combo inalámbrico, ideal para usuarios exigentes que buscan versatilidad y rendimiento en cada pulsación.', '2026-04-17 06:12:42', '2026-04-17 16:15:46'),
(80, 'Portátil Apple Macbook Air Apple M4 10 Núcleos/16 GB/512GB SSD/GPU 10 Núcleos/13.6\"', 9, 1449.00, 0.15, 'El brutal rendimiento del chip M4 y sus hasta 18 horas de autonomía convierten al MacBook Air en la herramienta ideal para todo lo que se te ocurra.', '2026-04-17 06:12:42', '2026-04-17 16:35:53'),
(81, 'Sony PlayStation 5 Slim Digital Chasis E', 18, 534.89, 0.00, 'La consola PS5® hace posibles nuevas formas de juego que jamás habías imaginado. Experimenta tiempos de carga ultrarrápidos con la SSD de alta velocidad, una inmersión más profunda gracias a la retroalimentación háptica, gatillos adaptativos y Audio 3D2, además de una nueva generación de increíbles juegos de PlayStation®.', '2026-04-17 06:12:42', '2026-04-17 14:48:53'),
(82, 'Logitech Speaker System Z906 500W 5.1 THX Digital', 15, 399.00, 0.19, 'Vive la experiencia home cinema con los Logitech Z906, un equipo de sonido 5.1 potente y nítido que trasladan tu sofá a una sala de cine cada vez que los enciendes.', '2026-04-17 06:12:42', '2026-04-17 15:44:50'),
(83, 'Fuente Alimentación Corsair CX650 650 W 80 Plus Bronze', 6, 58.95, 0.00, 'Las fuentes de alimentación CORSAIR CX Series cuentan con la certificación 80 PLUS Bronze y ofrecen hasta un 88 % de eficiencia operativa para reducir el calor y el consumo de energía. Su suministro de energía continuo y completo garantiza un rendimiento constante, mientras que el ventilador de refrigeración silenciosa y control térmico de 120 mm garantiza un funcionamiento silencioso.', '2026-04-17 06:12:42', '2026-04-17 08:14:39'),
(84, 'Procesador AMD Ryzen 7 9700X 3.8/5.5GHz', 2, 399.99, 0.26, 'Qui omnis quam explicabo nihil nesciunt esse.', '2026-04-17 06:12:42', '2026-04-17 08:01:49'),
(85, 'Memoria RAM Corsair Vengeance LPX DDR4 3200MHz PC4-25600 32GB 2x16GB CL16', 3, 269.95, 0.00, 'La memoria VENGEANCE LPX está diseñada para overclocking de alto rendimiento. El disipador térmico está hecho de aluminio puro para una disipación de calor más rápida, y el PCB de ocho capas ayuda a controlar el calor y proporciona un margen superior de overclocking superior.', '2026-04-17 06:12:42', '2026-04-17 15:07:13'),
(86, 'HP DeskJet 4320 Multifunción Color WiFi', 13, 69.90, 0.17, 'Optimiza el flujo de trabajo doméstico con la HP DeskJet 4320: eficiencia multifunción, conectividad avanzada y fácil manejo en un diseño compacto.', '2026-04-17 06:12:42', '2026-04-17 08:27:08'),
(87, 'Tablet Samsung Galaxy Tab A11 Plus WiFi 11\" 6GB 128GB Plata', 22, 214.28, 0.00, 'Rendimiento avanzado y autonomía real en una tablet ligera, perfecta para productividad y entretenimiento en movilidad.', '2026-04-17 06:12:42', '2026-04-17 15:54:46'),
(88, 'Motorola Moto G56 5G 8GB 256GB 6,72\" Negro Pantalla FHD+', 21, 249.01, 0.28, 'El Motorola Moto G56 5G está diseñado para quienes exigen fiabilidad, potencia y durabilidad en su día a día profesional o técnico. Su certificación MIL-STD-810H y protección IP68 lo convierten en un terminal resistente a caídas, polvo, agua y temperaturas extremas, ideal para entornos exigentes o uso intensivo en movilidad.', '2026-04-17 06:12:42', '2026-04-17 08:58:03'),
(89, 'Tempest M40 PRO RGB Master 2.0 Altavoces Gaming con Bluetooth Grises', 15, 24.99, 0.40, 'Hemos creado nuestras propias marcas para eliminar intermediarios, ajustar costes y controlar la calidad de principio a fin con un objetivo claro: ofrecerte rendimiento, fiabilidad y diseño al mejor precio.', '2026-04-17 06:12:42', '2026-04-17 15:40:31'),
(90, 'Portátil HP Victus 15-fb3030ns 15.6\" AMD Ryzen 5 8645HS 16GB 512GB SSD RTX 4050 6GB Azul', 9, 999.00, 0.22, 'Elige este equipo para gaming competitivo, streaming profesional, edición multimedia avanzada y todas tus exigencias informáticas. Actúa ahora y potencia tus sesiones gaming al máximo nivel.', '2026-04-17 06:12:42', '2026-04-17 16:37:17'),
(91, 'Cool Office Equipo Altavoces para PC 11W', 15, 27.99, 0.00, 'Equipo completo de audio para PC. Cuenta con acabado de tacto agradable. Diseño compacto. Indicados para tu ordenador portátil y ordenador de sobremesa. Conexión USB (alimentación) y conexión de audio tipo Jack 3,5mm. Interruptor de encendido y apagado. También incorpora dos ruletas para regular los bajos y los agudos.', '2026-04-17 06:12:42', '2026-04-17 15:45:57'),
(92, 'Monitor Samsung S24D302GAU 24\" LED IPS FullHD 100Hz', 14, 109.00, 0.27, 'Disfruta de imágenes nítidas y colores precisos con el Monitor Samsung S24D302GAU 24\" FullHD 100Hz IPS Flicker Free VESA, la solución perfecta para quienes buscan rendimiento y calidad en un formato compacto.', '2026-04-17 06:12:42', '2026-04-17 08:36:59'),
(93, 'Memoria RAM Forgeon Cyclone PRO RGB DDR5 6000 MHz 32GB 2x16GB CL30 Negra', 3, 569.00, 0.25, 'Forgeon Cyclone DDR5 está diseñado para llevar tu sistema al siguiente nivel con una memoria de alto rendimiento, ideal tanto para placas base AMD como Intel. Aprovechando las frecuencias y capacidades más altas que la tecnología DDR5 ofrece, Forgeon Cyclone proporciona un rendimiento sin igual en procesamiento, renderizado y almacenamiento en memoria interna.', '2026-04-17 06:12:42', '2026-04-17 15:08:28'),
(94, 'Logitech MK295 Silent Wireless Combo de Ratón y Teclado Inalámbricos', 11, 49.99, 0.30, 'Reduce el ruido y mantén la concentración en entornos profesionales con el Logitech MK295 Silent Wireless Combo, la herramienta definitiva para trabajar sin distracciones.', '2026-04-17 06:12:42', '2026-04-17 16:17:22'),
(95, 'Portátil Alurin Flex Advance AMD Ryzen 7-5825U 15.6\"/ 16GB/500GB/Windows 11 Home', 9, 644.99, 0.22, 'Hemos creado nuestras propias marcas para eliminar intermediarios, ajustar costes y controlar la calidad de principio a fin con un objetivo claro: ofrecerte rendimiento, fiabilidad y diseño al mejor precio.', '2026-04-17 06:12:42', '2026-04-17 14:52:35'),
(96, 'Placa Base MSI B850 GAMING PLUS WIFI', 4, 205.99, 0.14, 'Potencia lista para el futuro. Soporta procesadores AMD Ryzen 9000/8000/7000 en zócalo AM5 y hasta 256 GB DDR5, permitiéndote equipar tu equipo con lo último en rendimiento computacional y memoria de alta frecuencia compatible con overclocking para gaming avanzado y cargas profesionales intensivas.', '2026-04-17 06:12:42', '2026-04-17 14:39:27'),
(97, 'Tarjeta Gráfica ZOTAC GAMING GeForce RTX 5090 SOLID OC White Edition 32GB GDDR7 Reflex 2 RTX AI DLSS4', 5, 4199.00, 0.00, 'La Zotac GeForce RTX 5090 SOLID OC White Edition esta pensada para quien quiere el maximo rendimiento en gaming 4K, ray tracing y cargas de trabajo con IA sin compromisos.', '2026-04-17 06:12:42', '2026-04-17 16:07:15'),
(98, 'Monitor Samsung LS24F330EAUXEN 24\" FullHD 100Hz LCD 5ms VESA Eye Saver', 14, 88.00, 0.00, 'Mejora tu espacio de trabajo o gaming con el Samsung LS24F330EAUXEN, donde fluidez, comodidad visual y calidad de imagen se unen en un monitor todo terreno.', '2026-04-17 06:12:42', '2026-04-17 08:38:19'),
(99, 'Monitor HP OMEN 32c 31.5\" LED QHD 165Hz FreeSync Premium Curva', 14, 349.00, 0.32, 'Sumérgete en una experiencia visual de alto nivel con el Monitor HP OMEN 32c 31,5\" QHD 165Hz VA Curvo FreeSync Premium HDR400. Este monitor está diseñado para gamers exigentes y creadores de contenido que buscan máxima fluidez, color y realismo en cada partida o proyecto. Incluye cable DisplayPort y cable de corriente, eliminando la necesidad de comprar accesorios adicionales.', '2026-04-17 06:12:42', '2026-04-17 08:32:57'),
(100, 'Portátil Samsung Galaxy Book4 15 Intel Core i5-1335U/16GB/512GB SSD/15.6\"', 9, 799.00, 0.23, 'Impulsa tu jornada profesional donde sea con el Samsung Galaxy Book4: ligereza, potencia y autonomía sin concesiones para usuarios exigentes.', '2026-04-17 06:12:42', '2026-04-17 16:38:47');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indices de la tabla `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indices de la tabla `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_customer_id_foreign` (`customer_id`);

--
-- Indices de la tabla `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_items_cart_id_foreign` (`cart_id`),
  ADD KEY `cart_items_product_id_foreign` (`product_id`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categories_parent_category_id_foreign` (`parent_category_id`);

--
-- Indices de la tabla `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customers_email_unique` (`email`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indices de la tabla `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_category_id_foreign` (`category_id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);

--
-- Filtros para la tabla `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_cart_id_foreign` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_parent_category_id_foreign` FOREIGN KEY (`parent_category_id`) REFERENCES `categories` (`id`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
