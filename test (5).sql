-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 06, 2026 at 05:29 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quebshop2`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `product_id`, `quantity`) VALUES
(2, 11, 17, 1),
(4, 11, 24, 1),
(5, 11, 24, 3);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Vợt cầu lông'),
(2, 'Giày cầu lông');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_date` datetime DEFAULT current_timestamp(),
  `delivery_address` text NOT NULL,
  `payment_method` enum('cash','bank_transfer','online') NOT NULL,
  `status` enum('pending','confirmed','delivered','cancelled') DEFAULT 'pending',
  `total_amount` decimal(12,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `order_date`, `delivery_address`, `payment_method`, `status`, `total_amount`) VALUES
(1, 9, '2026-03-28 10:15:00', '25 Nguyễn Trãi, Quận 1, TP.HCM', 'cash', 'confirmed', 8584615.38),
(2, 11, '2026-03-28 14:20:00', '88 Lê Lợi, Quận 3, TP.HCM', 'bank_transfer', 'cancelled', 3600000.00),
(3, 9, '2026-03-29 09:30:00', '25 Nguyễn Trãi, Quận 1, TP.HCM', 'online', 'confirmed', 4320000.00),
(5, 14, '2026-04-03 15:11:35', '66 Thảo Điền, Phú Mỹ, Q2, TP.HCM', 'cash', 'pending', 0.00),
(10, 14, '2026-04-04 13:14:59', '66 Thảo Điền, Phú Mỹ, Q2, TP.HCM', 'cash', 'delivered', 48000000.00);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `selling_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `selling_price`) VALUES
(1, 1, 1, 2, 4134615.38),
(2, 1, 6, 1, 2340000.00),
(3, 2, 27, 1, 3600000.00),
(4, 3, 2, 1, 3900000.00),
(5, 3, 6, 1, 2340000.00),
(7, 5, 24, 1, 0.00),
(8, 5, 17, 3, 0.00),
(9, 5, 3, 1, 0.00),
(10, 5, 4, 3, 0.00),
(15, 10, 28, 2, 24000000.00);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `image_url` varchar(50) DEFAULT NULL,
  `quantity` int(11) DEFAULT 0,
  `cost_price` decimal(10,2) DEFAULT 0.00,
  `profit_rate` decimal(5,2) DEFAULT 20.00,
  `status` enum('hidden','visible') DEFAULT 'visible',
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `category_id`, `brand`, `image_url`, `quantity`, `cost_price`, `profit_rate`, `status`, `created_at`) VALUES
(1, 'Vợt cầu lông Lining Axforce 100', 'Vợt thiên công cao cấp dành cho vận động viên chuyên nghiệp', 1, 'Lining', 'assets/uploads/axforce-100-bla.jpg', 15, 666666.67, 25.00, 'visible', '2026-03-28 19:51:01'),
(2, 'Vợt cầu lông Lining Aeronaut 9000C', 'Vợt thiên công cao cấp dành cho vận động viên chuyên nghiệp', 1, 'Lining', 'assets/uploads/image_1775289991847.jpg', 5, 500000.00, 30.00, 'visible', '2026-03-28 19:51:01'),
(3, 'Vợt cầu lông Lining Aeronaut 7000C', 'Vợt thiên công cao cấp dành cho vận động viên chuyên nghiệp', 1, 'Lining', 'assets/uploads/aeronaut_7000b.jpg', 0, 0.00, 20.00, 'hidden', '2026-03-28 19:51:01'),
(4, 'Vợt cầu lông Lining Turbo Charging 75', 'Vợt thiên công cao cấp dành cho vận động viên chuyên nghiệp', 1, 'Lining', 'assets/uploads/image_1775290083372.jpg', 0, 0.00, 30.00, 'hidden', '2026-03-28 19:51:01'),
(5, 'Vợt cầu lông Lining 3D Calibar 900', 'Vợt cầu lông cao cấp dòng Calibar', 1, 'Lining', 'assets/uploads/image_1775290136981.jpg', 5, 2000000.00, 30.00, 'visible', '2026-03-28 19:51:01'),
(6, 'Vợt cầu lông Lining Windstorm 78', 'Vợt thiên công cao cấp dành cho vận động viên chuyên nghiệp', 1, 'Lining', 'assets/uploads/image_1775290182474.jpg', 10, 1000000.00, 30.00, 'visible', '2026-03-28 19:51:01'),
(7, 'Vợt cầu lông Lining N7-II', 'Vợt cầu lông cao cấp N7 phiên bản 2', 1, 'Lining', 'assets/uploads/image_1775290245841.jpg', 0, 0.00, 30.00, 'hidden', '2026-03-28 19:51:01'),
(8, 'Vợt cầu lông Lining G-Force Superlite 80', 'Dòng vợt siêu nhẹ G-Force', 1, 'Lining', 'assets/uploads/vot-cau-long-lining-axforce-80.jpg', 12, 2100000.00, 30.00, 'visible', '2026-03-28 19:51:01'),
(9, 'Vợt cầu lông Lining Super Series 26', 'Dòng vợt phổ thông Super Series', 1, 'Lining', 'assets/uploads/axforce-cannon-3.jpg', 10, 1900000.00, 30.00, 'visible', '2026-03-28 19:51:01'),
(10, 'Vợt cầu lông Yonex Astrox 100VA ZZ', 'Siêu phẩm kết hợp cùng Viktor Axelsen, công nghệ Rotational Generator System tối tân', 1, 'Yonex', 'assets/uploads/image_1775290365403.jpg', 6, 4200000.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(11, 'Vợt cầu lông Yonex Nanoflare 1000Z', 'Vợt có tốc độ vung nhanh nhất thế giới, thiết kế Wide Profile Frame', 1, 'Yonex', 'assets/uploads/image_1775290394716.jpg', 8, 3900000.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(12, 'Vợt cầu lông Yonex Astrox 88D Pro Gen 3', 'Thế hệ thứ 3 tối ưu cho người chơi cầu sau (Dominate)', 1, 'Yonex', 'assets/uploads/image_1775290429115.jpg', 5, 4100000.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(13, 'Vợt cầu lông Yonex Astrox 88S Pro Gen 3', 'Thế hệ thứ 3 tối ưu cho người chơi cầu trước (Decisive)', 1, 'Yonex', 'assets/uploads/image_1775293664581.jpg', 12, 3612500.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(14, 'Vợt cầu lông Yonex Arcsaber 11 Pro', 'Vợt công thủ toàn diện huyền thoại, khả năng điều cầu chính xác', 1, 'Yonex', 'assets/uploads/image_1775290463796.jpg', 14, 2671428.57, 20.00, 'visible', '2026-03-28 19:51:01'),
(15, 'Vợt cầu lông Yonex Nanoflare 800 Pro', 'Thiết kế khung Sonic Flare System cho những pha phản tạt chớp nhoáng', 1, 'Yonex', 'assets/uploads/image_1775290498133.jpg', 31, 1958064.52, 20.00, 'visible', '2026-03-28 19:51:01'),
(16, 'Vợt cầu lông Yonex Astrox 77 Pro', 'Vợt thiên công linh hoạt, phù hợp cho cả đơn và đôi', 1, 'Yonex', 'assets/uploads/image_1775290523126.jpg', 10, 3400000.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(17, 'Vợt cầu lông Yonex Nanoflare 700 Pro 2025', 'Phiên bản cải tiến giúp giảm rung chấn tối đa', 1, 'Yonex', 'assets/uploads/image_1775290555122.jpg', 0, 0.00, 20.00, 'hidden', '2026-03-28 19:51:01'),
(18, 'Vợt cầu lông Yonex Arcsaber 11 Play', 'Phiên bản phổ thông của Arc 11 Pro, cực kỳ dễ chơi', 1, 'Yonex', 'assets/uploads/image_1775290578337.jpg', 0, 0.00, 20.00, 'hidden', '2026-03-28 19:51:01'),
(19, 'Giày cầu lông Yonex Subaxia GT Men 2026', 'Dòng giày cao cấp mới nhất 2026, tối ưu sự ổn định', 2, 'Yonex', 'assets/uploads/image_1775290609764.jpg', 0, 0.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(20, 'Giày cầu lông Yonex Power Cushion 65Z4 VA', 'Phiên bản đặc biệt Viktor Axelsen 2026', 2, 'Yonex', 'assets/uploads/image_1775290638382.jpg', 0, 0.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(21, 'Giày cầu lông Yonex Power Cushion Aerus Z3', 'Đôi giày nhẹ nhất thế giới năm 2026', 1, 'Yonex', 'assets/uploads/image_1775290663494.jpg', 0, 0.00, 20.00, 'hidden', '2026-03-28 19:51:01'),
(22, 'Giày cầu lông Yonex Eclipsion Z3 Men 2026', 'Chuyên gia bảo vệ cổ chân với độ bám sân cực cao', 2, 'Yonex', 'assets/uploads/image_1775290686630.jpg', 5, 1000000.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(23, 'Giày cầu lông Yonex Power Cushion 88 Dial 3', 'Hệ thống thắt dây BOA kép thế hệ 3', 2, 'Yonex', 'assets/uploads/image_1775290728032.jpg', 0, 0.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(24, 'Giày cầu lông Yonex Comfort Z3 Wide Mid', 'Thiết kế cổ cao bảo vệ toàn diện cổ chân', 2, 'Yonex', 'assets/uploads/image_1775294961935.jpg', 0, 0.00, 20.00, 'hidden', '2026-03-28 19:51:01'),
(25, 'Giày cầu lông Yonex Cascade Accel 2026', 'Dòng giày tầm trung hỗ trợ lực bật nhảy tốt', 2, 'Yonex', 'assets/uploads/image_1775290752650.jpg', 0, 0.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(26, 'Giày cầu lông Yonex Strider Flow 2026', 'Mẫu giày tập luyện chuyên nghiệp, bền bỉ', 2, 'Yonex', 'assets/uploads/image_1775294624544.jpg', 0, 0.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(27, 'Giày cầu lông Yonex Power Cushion Infinity 2', 'Hệ thống điều chỉnh độ ôm 3D đỉnh cao', 2, 'Yonex', 'assets/uploads/image_1775294168805.jpg', 0, 0.00, 20.00, 'hidden', '2026-03-28 19:51:01'),
(28, 'Vợt cầu lông iPhone 13', 'test flow', 1, 'Yonex', NULL, 18, 25555555.56, 20.00, 'visible', '2026-04-04 12:58:58');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_orders`
--

CREATE TABLE `purchase_orders` (
  `id` int(11) NOT NULL,
  `order_date` datetime DEFAULT current_timestamp(),
  `supplier_name` varchar(255) DEFAULT NULL,
  `status` enum('pending','completed') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchase_orders`
--

INSERT INTO `purchase_orders` (`id`, `order_date`, `supplier_name`, `status`) VALUES
(17, '2026-03-01 09:00:00', 'Yonex Vietnam', 'completed'),
(18, '2026-03-05 14:20:00', 'Li-Ning Official', 'completed'),
(19, '2026-03-10 10:15:00', 'Victor Distributor', 'completed'),
(35, '2026-03-13 10:22:00', NULL, 'completed'),
(36, '2026-03-19 10:23:00', NULL, 'completed'),
(37, '2026-03-30 11:10:00', NULL, 'completed'),
(38, '2026-03-18 11:39:00', NULL, 'completed'),
(39, '2026-03-27 12:06:00', NULL, 'completed'),
(40, '2026-04-04 13:09:00', NULL, 'completed'),
(41, '2026-04-04 13:18:00', NULL, 'completed');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_order_items`
--

CREATE TABLE `purchase_order_items` (
  `id` int(11) NOT NULL,
  `purchase_order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `import_price` decimal(10,2) NOT NULL,
  `number_import_times` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchase_order_items`
--

INSERT INTO `purchase_order_items` (`id`, `purchase_order_id`, `product_id`, `quantity`, `import_price`, `number_import_times`) VALUES
(30, 17, 8, 12, 2100000.00, 1),
(31, 17, 9, 10, 1900000.00, 1),
(32, 17, 10, 6, 4200000.00, 1),
(33, 18, 11, 8, 3900000.00, 1),
(34, 18, 12, 5, 4100000.00, 1),
(35, 18, 13, 7, 4050000.00, 1),
(36, 19, 14, 9, 3600000.00, 1),
(37, 19, 15, 11, 3700000.00, 1),
(38, 19, 16, 10, 3400000.00, 1),
(61, 35, 1, 10, 500000.00, 1),
(62, 35, 22, 5, 1000000.00, 1),
(63, 36, 14, 5, 1000000.00, 2),
(64, 36, 15, 20, 1000000.00, 2),
(65, 36, 13, 5, 3000000.00, 2),
(66, 37, 1, 5, 1000000.00, 2),
(67, 38, 2, 5, 500000.00, 1),
(68, 38, 6, 10, 1000000.00, 1),
(69, 39, 5, 5, 2000000.00, 1),
(70, 40, 28, 10, 20000000.00, 1),
(71, 41, 28, 10, 30000000.00, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` enum('customer','admin') DEFAULT 'customer',
  `status` enum('active','locked') DEFAULT 'active',
  `created_at` datetime DEFAULT current_timestamp(),
  `is_reset` tinyint(1) DEFAULT 0,
  `default_address` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `role`, `status`, `created_at`, `is_reset`, `default_address`) VALUES
(1, 'Admin Chính', 'admin@gmail.com', '$2y$10$gTq4Ot/Xf6GMVwM7ZuTeqONYPhAPWuDBHXWgcYolUR411vWhxO0P.', NULL, 'admin', 'active', '2026-03-28 09:38:04', 1, '12 Nguyễn Trãi, Quận 5, TP.HCM'),
(7, 'Admin Phụ', 'admin2@gmail.com', '$2y$10$YkmURMDW5jbJJS9FItidjO5cRYyZgNscIBjBrwXq9iyBj/KJy7U3q', '0987654321', 'admin', 'active', '2026-03-28 09:50:08', 1, '12 Nguyễn Huệ, Quận 1, TP.HCM'),
(8, 'Admin Phụ', 'admin3@gmail.com', '$2y$10$0Fcg5mEnFLlkfjwfFI3nBuSD8MrWta.4i5x48bWQg08h3ZFmCWb2u', '0912345678', 'admin', 'active', '2026-03-28 09:50:08', 1, '45 Lê Lợi, Hoàn Kiếm, Hà Nội'),
(9, 'Nguyễn Văn A', 'user1@gmail.com', '$2y$10$nz0r1oHd7.7Dcljd59wareLDCmHo2qIoG4MQ9PMGohHP2p1.1WHHW', '0978123456', 'customer', 'active', '2026-03-28 09:50:08', 1, NULL),
(10, 'Trần Thị B', 'user2@gmail.com', '$2y$10$TEqEfxOmOWn6vbrFkxngK./qX7BQ5KpbXmCsBxaO2WCA4ZGh3.vvO', '0934567890', 'customer', 'active', '2026-03-28 09:50:08', 1, NULL),
(11, 'Lê Minh C', 'user3@gmail.com', '$2y$10$/x/xYvnLZOFCA5rGGN2GK.HRI9W8rxy6UJIqpo5FUDBVQ/STVMPAu', '0965432109', 'customer', 'active', '2026-03-28 09:50:08', 1, NULL),
(14, 'Đinh Công Thành', 'obitohaha63@gmail.com', '$2y$10$zh1VEJmqoBHJZzA3sozcNekmEjYlOojk0pjTeSAIVdXJvVqXYEf3O', '0796556438', 'customer', 'active', '2026-04-03 13:57:45', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_address`
--

CREATE TABLE `user_address` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `city` varchar(100) NOT NULL,
  `district` varchar(100) NOT NULL,
  `ward` varchar(100) NOT NULL,
  `detail_address` text DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_address`
--

INSERT INTO `user_address` (`id`, `user_id`, `city`, `district`, `ward`, `detail_address`, `is_default`, `created_at`) VALUES
(1, 9, 'TP.HCM', 'Quận 1', 'Phường Bến Nghé', '12 Nguyễn Huệ', 1, '2026-03-29 23:20:06'),
(2, 10, 'TP.HCM', 'Quận Bình Thạnh', 'Phường Gia Định', '36 AB đỏ', 0, '2026-03-29 23:29:23'),
(3, 11, 'TP.HCM', 'Quận dây', 'Phường phố đã lên đèn', '36 AB đỏ', 1, '2026-03-29 23:39:21'),
(5, 14, 'TP.HCM', 'Q2', 'Phú Mỹ', '66 Thảo Điền', 1, '2026-04-03 13:57:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_ibfk_1` (`category_id`);

--
-- Indexes for table `purchase_orders`
--
ALTER TABLE `purchase_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchase_order_items`
--
ALTER TABLE `purchase_order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchase_order_id` (`purchase_order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_address`
--
ALTER TABLE `user_address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `purchase_orders`
--
ALTER TABLE `purchase_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `purchase_order_items`
--
ALTER TABLE `purchase_order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user_address`
--
ALTER TABLE `user_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `purchase_order_items`
--
ALTER TABLE `purchase_order_items`
  ADD CONSTRAINT `purchase_order_items_ibfk_1` FOREIGN KEY (`purchase_order_id`) REFERENCES `purchase_orders` (`id`),
  ADD CONSTRAINT `purchase_order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `user_address`
--
ALTER TABLE `user_address`
  ADD CONSTRAINT `user_address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
