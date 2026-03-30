-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th3 29, 2026 lúc 12:27 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `test`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Vợt cầu lông'),
(2, 'Giày cầu lông');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
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
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `order_date`, `delivery_address`, `payment_method`, `status`, `total_amount`) VALUES
(10, 9, '2026-03-29 13:00:00', '25 Nguyễn Trãi, Q1', 'cash', 'confirmed', 7800000.00),
(11, 11, '2026-03-29 14:00:00', '88 Lê Lợi, Q3', 'online', 'delivered', 6400000.00),
(12, 9, '2026-03-29 15:00:00', '25 Nguyễn Trãi, Q1', 'bank_transfer', 'confirmed', 5300000.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `selling_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `selling_price`) VALUES
(20, 10, 1, 1, 4134615.00),
(21, 10, 6, 1, 2340000.00),
(22, 11, 10, 1, 4200000.00),
(23, 11, 20, 1, 2200000.00),
(24, 12, 2, 1, 3900000.00),
(25, 12, 21, 1, 1400000.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `color` varchar(50) DEFAULT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `size` varchar(50) DEFAULT NULL,
  `image_url` varchar(50) DEFAULT NULL,
  `quantity` int(11) DEFAULT 0,
  `cost_price` decimal(10,2) DEFAULT 0.00,
  `profit_rate` decimal(5,2) DEFAULT 20.00,
  `status` enum('hidden','visible') DEFAULT 'visible',
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `category_id`, `color`, `brand`, `size`, `image_url`, `quantity`, `cost_price`, `profit_rate`, `status`, `created_at`) VALUES
(1, 'Vợt cầu lông Lining Axforce 100', 'Vợt thiên công cao cấp dành cho vận động viên chuyên nghiệp', 1, 'Black golden, Vàng golden', 'Lining', '3U,4U', 'astrox99pro.jpg', 39, 1210256.41, 25.00, 'visible', '2026-03-28 19:51:01'),
(2, 'Vợt cầu lông Lining Aeronaut 9000C', 'Vợt thiên công cao cấp dành cho vận động viên chuyên nghiệp', 1, 'Black, Red', 'Li-Ning', '3U,4U', 'aeronaut_9000c.jpg', 7, 3000000.00, 30.00, 'visible', '2026-03-28 19:51:01'),
(3, 'Vợt cầu lông Lining Aeronaut 7000C', 'Vợt thiên công cao cấp dành cho vận động viên chuyên nghiệp', 1, 'Black, Orange', 'Li-Ning', '3U,4U', 'aeronaut_7000c.jpg', 12, 2800000.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(4, 'Vợt cầu lông Lining Turbo Charging 75', 'Vợt thiên công cao cấp dành cho vận động viên chuyên nghiệp', 1, 'Red, Black', 'Li-Ning', '3U,4U', 'turbo_charging_75.jpg', 0, 0.00, 30.00, 'visible', '2026-03-28 19:51:01'),
(5, 'Vợt cầu lông Lining 3D Calibar 900', 'Vợt cầu lông cao cấp dòng Calibar', 1, 'Black, Grey', 'Li-Ning', '3U,4U', '3d_calibar_900.jpg', 0, 0.00, 30.00, 'visible', '2026-03-28 19:51:01'),
(6, 'Vợt cầu lông Lining Windstorm 78', 'Vợt thiên công cao cấp dành cho vận động viên chuyên nghiệp', 1, 'White, Blue', 'Li-Ning', '3U,4U', 'windstorm_78.jpg', 4, 1000000.00, 30.00, 'visible', '2026-03-28 19:51:01'),
(7, 'Vợt cầu lông Lining N7-II', 'Vợt cầu lông cao cấp N7 phiên bản 2', 1, 'White, Red', 'Li-Ning', '3U,4U', 'n7_ii.jpg', 0, 0.00, 30.00, 'visible', '2026-03-28 19:51:01'),
(8, 'Vợt cầu lông Lining G-Force Superlite 80', 'Dòng vợt siêu nhẹ G-Force', 1, 'Black, Yellow', 'Li-Ning', '3U,4U', 'gforce_superlite_80.jpg', 12, 2100000.00, 30.00, 'visible', '2026-03-28 19:51:01'),
(9, 'Vợt cầu lông Lining Super Series 26', 'Dòng vợt phổ thông Super Series', 1, 'Black, Silver', 'Li-Ning', '3U,4U', 'super_series_26.jpg', 10, 1900000.00, 30.00, 'visible', '2026-03-28 19:51:01'),
(10, 'Yonex Astrox 100VA ZZ', 'Siêu phẩm kết hợp cùng Viktor Axelsen, công nghệ Rotational Generator System tối tân', 1, 'Lightning Yellow', 'Yonex', '3U,4U', 'astrox_100va_zz.jpg', 11, 4200000.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(11, 'Yonex Nanoflare 1000Z', 'Vợt có tốc độ vung nhanh nhất thế giới, thiết kế Wide Profile Frame', 1, 'Lightning Yellow', 'Yonex', '3U,4U', 'nanoflare_1000z.jpg', 13, 3900000.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(12, 'Yonex Astrox 88D Pro Gen 3', 'Thế hệ thứ 3 tối ưu cho người chơi cầu sau (Dominate)', 1, 'Black/Silver', 'Yonex', '3U,4U', 'astrox_88d_pro_g3.jpg', 9, 4100000.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(13, 'Yonex Astrox 88S Pro Gen 3', 'Thế hệ thứ 3 tối ưu cho người chơi cầu trước (Decisive)', 1, 'Emerald Blue', 'Yonex', '3U,4U', 'astrox_88s_pro_g3.jpg', 12, 2779166.67, 20.00, 'visible', '2026-03-28 19:51:01'),
(14, 'Yonex Arcsaber 11 Pro', 'Vợt công thủ toàn diện huyền thoại, khả năng điều cầu chính xác', 1, 'Grayish Pearl', 'Yonex', '3U,4U', 'arcsaber_11_pro.jpg', 9, 3600000.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(15, 'Yonex Nanoflare 800 Pro', 'Thiết kế khung Sonic Flare System cho những pha phản tạt chớp nhoáng', 1, 'Deep Green', 'Yonex', '3U,4U', 'nanoflare_800_pro.jpg', 11, 3700000.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(16, 'Yonex Astrox 77 Pro', 'Vợt thiên công linh hoạt, phù hợp cho cả đơn và đôi', 1, 'High Orange', 'Yonex', '3U,4U', 'astrox_77_pro.jpg', 10, 3400000.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(17, 'Yonex Nanoflare 700 Pro 2025', 'Phiên bản cải tiến giúp giảm rung chấn tối đa', 1, 'Midnight Blue', 'Yonex', '4U,5U', 'nanoflare_700_pro_2025.jpg', 0, 0.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(18, 'Yonex Arcsaber 11 Play', 'Phiên bản phổ thông của Arc 11 Pro, cực kỳ dễ chơi', 1, 'Grayish Pearl', 'Yonex', '4U', 'arcsaber_11_play.jpg', 0, 0.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(19, 'Yonex Subaxia GT Men 2026', 'Dòng giày cao cấp mới nhất 2026, tối ưu sự ổn định', 2, 'Dark Gray', 'Yonex', '39-45', 'subaxia_gt_men.jpg', 0, 0.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(20, 'Yonex Power Cushion 65Z4 VA', 'Phiên bản đặc biệt Viktor Axelsen 2026', 2, 'Grayish Beige', 'Yonex', '39-45', '65z4_va_collection.jpg', 11, 1666666.67, 20.00, 'visible', '2026-03-28 19:51:01'),
(21, 'Yonex Power Cushion Aerus Z3', 'Đôi giày nhẹ nhất thế giới năm 2026', 2, 'Flash Green', 'Yonex', '37-44', 'aerus_z3_green.jpg', 8, 2300000.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(22, 'Yonex Eclipsion Z3 Men 2026', 'Chuyên gia bảo vệ cổ chân với độ bám sân cực cao', 2, 'Navy Blue', 'Yonex', '39-45', 'eclipsion_z3_navy.jpg', 0, 0.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(23, 'Yonex Power Cushion 88 Dial 3', 'Hệ thống thắt dây BOA kép thế hệ 3', 2, 'Black/Ice Blue', 'Yonex', '39-44', '88_dial_3_black.jpg', 0, 0.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(24, 'Yonex Comfort Z3 Wide Mid', 'Thiết kế cổ cao bảo vệ toàn diện cổ chân', 2, 'Off White/Red', 'Yonex', '40-45', 'comfort_z3_mid.jpg', 0, 0.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(25, 'Yonex Cascade Accel 2026', 'Dòng giày tầm trung hỗ trợ lực bật nhảy tốt', 2, 'White/Sky Blue', 'Yonex', '37-44', 'cascade_accel_2026.jpg', 10, 1250000.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(26, 'Yonex Strider Flow 2026', 'Mẫu giày tập luyện chuyên nghiệp, bền bỉ', 2, 'Black/Blue', 'Yonex', '38-45', 'strider_flow_black.jpg', 0, 0.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(27, 'Yonex Power Cushion Infinity 2', 'Hệ thống điều chỉnh độ ôm 3D đỉnh cao', 2, 'Metallic Gold', 'Yonex', '40-44', 'infinity_2_gold.jpg', 5, 3000000.00, 20.00, 'visible', '2026-03-28 19:51:01');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `purchase_orders`
--

CREATE TABLE `purchase_orders` (
  `id` int(11) NOT NULL,
  `order_date` datetime DEFAULT current_timestamp(),
  `supplier_name` varchar(255) DEFAULT NULL,
  `status` enum('pending','completed') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `purchase_orders`
--

INSERT INTO `purchase_orders` (`id`, `order_date`, `supplier_name`, `status`) VALUES
(17, '2026-03-01 09:00:00', 'Yonex Vietnam', 'completed'),
(18, '2026-03-05 14:20:00', 'Li-Ning Official', 'completed'),
(19, '2026-03-10 10:15:00', 'Victor Distributor', 'completed'),
(40, '2026-03-29 08:00:00', 'Li-Ning Official', 'completed'),
(41, '2026-03-29 09:00:00', 'Yonex Vietnam', 'completed'),
(42, '2026-03-29 10:00:00', 'Yonex Vietnam', 'completed'),
(43, '2026-03-18 16:07:00', NULL, 'completed'),
(44, '2026-03-19 16:41:00', NULL, 'completed'),
(45, '2026-03-11 16:45:00', NULL, 'completed'),
(46, '2026-03-11 16:53:00', NULL, 'completed'),
(47, '2026-03-12 16:59:00', NULL, 'completed'),
(48, '2026-03-13 17:11:00', NULL, 'completed');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `purchase_order_items`
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
-- Đang đổ dữ liệu cho bảng `purchase_order_items`
--

INSERT INTO `purchase_order_items` (`id`, `purchase_order_id`, `product_id`, `quantity`, `import_price`, `number_import_times`) VALUES
(30, 17, 8, 12, 2100000.00, 1),
(31, 17, 9, 10, 1900000.00, 1),
(32, 17, 10, 6, 4200000.00, 2),
(33, 18, 11, 8, 3900000.00, 2),
(34, 18, 12, 5, 4100000.00, 2),
(35, 18, 13, 7, 4050000.00, 1),
(36, 19, 14, 9, 3600000.00, 1),
(37, 19, 15, 11, 3700000.00, 1),
(38, 19, 16, 10, 3400000.00, 1),
(70, 40, 1, 10, 3200000.00, 1),
(71, 40, 2, 8, 3000000.00, 1),
(72, 40, 3, 12, 2800000.00, 1),
(73, 41, 10, 6, 4200000.00, 1),
(74, 41, 11, 5, 3900000.00, 1),
(75, 41, 12, 4, 4100000.00, 1),
(76, 42, 20, 7, 2500000.00, 1),
(77, 42, 21, 9, 2300000.00, 1),
(78, 42, 27, 5, 3000000.00, 1),
(79, 43, 20, 5, 500000.00, 2),
(80, 44, 13, 5, 1000000.00, 2),
(81, 44, 25, 10, 1250000.00, 1),
(82, 45, 1, 5, 500000.00, 2),
(83, 46, 6, 5, 1000000.00, 1),
(84, 47, 1, 20, 500000.00, 4),
(85, 48, 1, 5, 1000000.00, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
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

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `role`, `status`, `created_at`, `is_reset`) VALUES
(1, 'Admin Chính', 'admin@gmail.com', '$2y$10$...', NULL, 'admin', 'active', '2026-03-28 09:38:04', 1),
(7, 'Admin Phụ', 'admin2@gmail.com', '$2y$10$...', '0987654321', 'admin', 'active', '2026-03-28 09:50:08'),
(8, 'Admin Phụ', 'admin3@gmail.com', '$2y$10$...', '0912345678', 'admin', 'active', '2026-03-28 09:50:08', 0),
(9, 'Nguyễn Văn A', 'user1@gmail.com', '$2y$10$...', '0978123456', 'customer', 'active', '2026-03-28 09:50:08', 0),
(10, 'Trần Thị B', 'user2@gmail.com', '$2y$10$...', '0934567890', 'customer', 'locked', '2026-03-28 09:50:08', 0),
(11, 'Lê Minh C', 'user3@gmail.com', '$2y$10$...', '0965432109', 'customer', 'active', '2026-03-28 09:50:08', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_address`
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

INSERT INTO user_address (user_id, city, district, ward, detail_address, is_default)
VALUES (11, 'TP.HCM', 'Quận dây', 'Phường phố đã lên đèn', '36 AB đỏ', 0),
(10, 'TP.HCM', 'Quận Bình Thạnh', 'Phường Gia Định', '36 AB đỏ', 0),
 (9, 'TP.HCM', 'Quận 1', 'Phường Bến Nghé', '12 Nguyễn Huệ', 1);
--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `purchase_orders`
--
ALTER TABLE `purchase_orders`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `purchase_order_items`
--
ALTER TABLE `purchase_order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchase_order_id` (`purchase_order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Chỉ mục cho bảng `user_address`
--
ALTER TABLE `user_address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT cho bảng `purchase_orders`
--
ALTER TABLE `purchase_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT cho bảng `purchase_order_items`
--
ALTER TABLE `purchase_order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `user_address`
--
ALTER TABLE `user_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `purchase_order_items`
--
ALTER TABLE `purchase_order_items`
  ADD CONSTRAINT `purchase_order_items_ibfk_1` FOREIGN KEY (`purchase_order_id`) REFERENCES `purchase_orders` (`id`),
  ADD CONSTRAINT `purchase_order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `user_address`
--
ALTER TABLE `user_address`
  ADD CONSTRAINT `user_address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;