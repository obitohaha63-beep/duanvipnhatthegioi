-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2026 at 04:56 AM
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
(13, 14, '2026-04-08 09:50:30', '66 Thảo Điền, Phú Mỹ, Q2, TP.HCM', 'cash', 'pending', 2600000.00),
(14, 14, '2026-04-08 09:51:40', '66 Thảo Điền, Phú Mỹ, Q2, TP.HCM', 'cash', 'confirmed', 3900000.00),
(15, 14, '2026-04-08 09:52:12', '66 Thảo Điền, Phú Mỹ, Q2, TP.HCM', 'cash', 'pending', 1300000.00),
(16, 9, '2026-04-08 09:53:30', '12 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM', 'cash', 'delivered', 7860000.00),
(17, 9, '2026-04-08 09:53:51', '12 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM', 'cash', 'confirmed', 2860000.00);

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
(18, 13, 2, 1, 650000.00),
(19, 13, 7, 1, 1950000.00),
(20, 14, 19, 1, 960000.00),
(21, 14, 20, 1, 2940000.00),
(22, 15, 6, 1, 1300000.00),
(23, 16, 17, 1, 4560000.00),
(24, 16, 23, 1, 3300000.00),
(25, 17, 4, 1, 2860000.00);

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
(1, 'Vợt cầu lông Lining Axforce 100', 'Đỉnh cao dòng Axforce với khung Carbon Fiber siêu bền. Vợt sở hữu thân cứng, đầu nặng, tích hợp công nghệ HDF Shock Absorption giúp giảm chấn tối đa, mang lại những cú smash sấm sét cho vận động viên chuyên nghiệp.', 1, 'Lining', 'assets/uploads/axforce-100-bla.jpg', 15, 666666.67, 25.00, 'visible', '2026-03-28 19:51:01'),
(2, 'Vợt cầu lông Lining Aeronaut 9000C', 'Sở hữu hệ thống rãnh thoát khí độc đáo giúp giảm lực cản không khí tối đa. Đây là cây vợt thiên công mạnh mẽ (Combat), phù hợp với người chơi có lực cổ tay tốt, thích lối đánh áp đảo từ phía sau sân.', 1, 'Lining', 'assets/uploads/image_1775289991847.jpg', 5, 500000.00, 30.00, 'visible', '2026-03-28 19:51:01'),
(3, 'Vợt cầu lông Lining Aeronaut 7000C', 'Dòng vợt Combat với sự cân bằng tuyệt vời giữa sức mạnh và tốc độ. Công nghệ Aeronaut giúp tăng tốc độ vung vợt, hỗ trợ người chơi thực hiện những pha tấn công liên tục mà vẫn đảm bảo khả năng thủ cầu linh hoạt.', 1, 'Lining', 'assets/uploads/aeronaut_7000b.jpg', 0, 0.00, 20.00, 'hidden', '2026-03-28 19:51:01'),
(4, 'Vợt cầu lông Lining Turbo Charging 75', 'Thiết kế khung vợt khí động học đặc trưng giúp tăng tốc độ xử lý cầu nhanh. Sản phẩm dành cho những tay vợt ưa thích lối chơi tấn công nhanh, phản tạt chớp nhoáng và ép sân đối phương bằng tốc độ.', 1, 'Lining', 'assets/uploads/image_1775290083372.jpg', 4, 2200000.00, 30.00, 'visible', '2026-03-28 19:51:01'),
(5, 'Vợt cầu lông Lining 3D Calibar 900', 'Áp dụng công nghệ khung đa giác 3D giúp cắt giảm sức cản không khí, tối ưu hóa lực đánh. Đây là cây vợt cao cấp mang lại sự ổn định cực cao, phù hợp cho lối chơi bao sân và kiểm soát trận đấu một cách chủ động.', 1, 'Lining', 'assets/uploads/image_1775290136981.jpg', 5, 2000000.00, 30.00, 'visible', '2026-03-28 19:51:01'),
(6, 'Vợt cầu lông Lining Windstorm 78', 'Siêu phẩm trong phân khúc vợt nhẹ nhưng vẫn giữ được khả năng tấn công đáng nể. Công nghệ Super Light giúp người chơi xoay chuyển vợt linh hoạt, lý tưởng cho phái nữ hoặc người chơi thích lối đánh nhanh, kỹ thuật.', 1, 'Lining', 'assets/uploads/image_1775290182474.jpg', 10, 1000000.00, 30.00, 'visible', '2026-03-28 19:51:01'),
(7, 'Vợt cầu lông Lining N7-II', 'Mẫu vợt huyền thoại được nâng cấp với sợi Carbon liên kết mật độ cao. N7-II mang lại cảm giác đánh chắc chắn, không rung đầu, cực kỳ hiệu quả trong những pha điều cầu sát sạt và tấn công cuối sân uy lực.', 1, 'Lining', 'assets/uploads/image_1775290245841.jpg', 8, 1500000.00, 30.00, 'visible', '2026-03-28 19:51:01'),
(8, 'Vợt cầu lông Lining G-Force Superlite 80', 'Dòng vợt siêu nhẹ được thiết kế dựa trên vật liệu carbon siêu bền. Với đầu vợt hơi nặng, G-Force Superlite 80 hỗ trợ lực đập cầu cực tốt trong khi vẫn đảm bảo sự nhẹ nhàng, giảm áp lực lên vai và cổ tay người chơi.', 1, 'Lining', 'assets/uploads/vot-cau-long-lining-axforce-80.jpg', 12, 2100000.00, 30.00, 'visible', '2026-03-28 19:51:01'),
(9, 'Vợt cầu lông Lining Super Series 26', 'Mẫu vợt phổ thông kinh điển của Lining với khung vợt linh hoạt và độ bền vượt trội. Đây là lựa chọn số 1 cho người chơi phong trào nhờ khả năng trợ lực tốt, dễ thuần và phù hợp với nhiều phong cách thi đấu khác nhau.', 1, 'Lining', 'assets/uploads/axforce-cannon-3.jpg', 10, 1900000.00, 30.00, 'visible', '2026-03-28 19:51:01'),
(10, 'Vợt cầu lông Yonex Astrox 100VA ZZ', 'Siêu phẩm kết hợp cùng Viktor Axelsen, sử dụng vật liệu Namd giúp tăng lực liên kết giữa các sợi carbon. Công nghệ Rotational Generator System phân bổ trọng lượng thông minh, giúp vợt phục hồi nhanh chóng sau mỗi cú đập.', 1, 'Yonex', 'assets/uploads/image_1775290365403.jpg', 6, 4200000.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(11, 'Vợt cầu lông Yonex Nanoflare 1000Z', 'Thiết lập kỷ lục về tốc độ vung vợt nhờ khung Wide Profile Frame. Sản phẩm dành cho người chơi trình độ cao, yêu cầu tốc độ ra đòn nhanh như chớp và khả năng xử lý cầu trong phạm vi hẹp với độ chính xác tuyệt đối.', 1, 'Yonex', 'assets/uploads/image_1775290394716.jpg', 8, 3900000.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(12, 'Vợt cầu lông Yonex Astrox 88D Pro Gen 3', 'Thế hệ thứ 3 đột phá với công nghệ dãn dài lỗ gen, tối ưu hóa điểm ngọt và sức mạnh cho người chơi cầu sau (Dominate). Khung vợt cứng cáp hỗ trợ những cú smash uy lực xuyên thủng hàng phòng ngự đối phương.', 1, 'Yonex', 'assets/uploads/image_1775290429115.jpg', 5, 4100000.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(13, 'Vợt cầu lông Yonex Astrox 88S Pro Gen 3', 'Phiên bản chuyên dụng cho người chơi đứng trên (Decisive). Vợt có thiết kế thân ngắn hơn một chút và độ linh hoạt cao, giúp các pha tạt cầu, đẩy cầu và dứt điểm trên lưới trở nên nhanh nhẹn và sắc bén hơn bao giờ hết.', 1, 'Yonex', 'assets/uploads/image_1775293664581.jpg', 12, 3612500.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(14, 'Vợt cầu lông Yonex Arcsaber 11 Pro', 'Kế thừa dòng vợt công thủ toàn diện huyền thoại. Arcsaber 11 Pro sử dụng công nghệ Control-Assist Bumper giúp giữ cầu lâu hơn trên mặt vợt, mang lại khả năng điều phối trận đấu và kiểm soát điểm rơi cực kỳ chính xác.', 1, 'Yonex', 'assets/uploads/image_1775290463796.jpg', 14, 2671428.57, 20.00, 'visible', '2026-03-28 19:51:01'),
(15, 'Vợt cầu lông Yonex Nanoflare 800 Pro', 'Đỉnh cao của lối chơi phản tạt. Khung vợt siêu mỏng kết hợp hệ thống Sonic Flare System giúp tăng cường lực đẩy cầu nhanh, hỗ trợ tối đa trong các tình huống phòng thủ chủ động và những pha đôi công tốc độ cao.', 1, 'Yonex', 'assets/uploads/image_1775290498133.jpg', 31, 1958064.52, 20.00, 'visible', '2026-03-28 19:51:01'),
(16, 'Vợt cầu lông Yonex Astrox 77 Pro', 'Dòng vợt tấn công êm ái, phù hợp cho cả đánh đơn và đánh đôi. Thân vợt có độ dẻo trung bình giúp người chơi dễ dàng tạo ra những cú đập cầu uy lực mà không đòi hỏi lực cổ tay quá mạnh, giảm thiểu nguy cơ chấn thương.', 1, 'Yonex', 'assets/uploads/image_1775290523126.jpg', 10, 3400000.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(17, 'Vợt cầu lông Yonex Nanoflare 700 Pro 2025', 'Phiên bản cải tiến mới nhất cho năm 2025 với khung vợt Aero Frame siêu nhẹ. Công nghệ giảm rung chấn thế hệ mới giúp người chơi cảm nhận cầu tốt hơn, mang lại những đường cầu mượt mà và thoát tay trong mọi tình huống.', 1, 'Yonex', 'assets/uploads/image_1775290555122.jpg', 5, 3800000.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(18, 'Vợt cầu lông Yonex Arcsaber 11 Play', 'Phiên bản phổ thông dễ chơi nhất trong dòng Arcsaber. Vợt có khung Carbon cứng cáp nhưng thân dẻo trợ lực tốt, cực kỳ phù hợp cho người mới tập chơi hoặc người chơi phong trào cần một cây vợt bền bỉ và dễ điều khiển.', 1, 'Yonex', 'assets/uploads/image_1775290578337.jpg', 10, 750000.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(19, 'Giày cầu lông Yonex Subaxia GT Men 2026', 'Dòng giày cao cấp thế hệ mới 2026 tích hợp công nghệ đệm khí cải tiến. Thiết kế ôm sát bàn chân giúp tăng cường sự ổn định khi di chuyển ngang và bảo vệ tối đa vùng gót chân khỏi những va chạm mạnh.', 2, 'Yonex', 'assets/uploads/image_1775290609764.jpg', 14, 800000.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(20, 'Giày cầu lông Yonex Power Cushion 65Z4 VA', 'Phiên bản đặc biệt mang chữ ký của Viktor Axelsen 2026. Sở hữu công nghệ Power Cushion+ độc quyền cho khả năng hấp thụ sốc gấp 3 lần, giúp những bước chạy trở nên nhẹ nhàng và hỗ trợ lực bật nhảy cực tốt.', 2, 'Yonex', 'assets/uploads/image_1775290638382.jpg', 9, 2450000.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(21, 'Giày cầu lông Yonex Power Cushion Aerus Z3', 'Mẫu giày nhẹ nhất lịch sử Yonex phiên bản 2026. Với vật liệu thân giày liền mạch và đế cao su siêu bám, Aerus Z3 giúp vận động viên bùng nổ tốc độ trong những pha di chuyển cứu cầu khó nhất.', 1, 'Yonex', 'assets/uploads/image_1775290663494.jpg', 0, 0.00, 20.00, 'hidden', '2026-03-28 19:51:01'),
(22, 'Giày cầu lông Yonex Eclipsion Z3 Men 2026', 'Dòng giày chuyên dụng cho sự ổn định (Stability). Thiết kế khung Lateral Shell giúp chống lật cổ chân và giữ thăng bằng tuyệt vời, là sự lựa chọn hàng đầu cho những người chơi có lối di chuyển mạnh mẽ và liên tục.', 2, 'Yonex', 'assets/uploads/image_1775290686630.jpg', 13, 2353846.15, 20.00, 'visible', '2026-03-28 19:51:01'),
(23, 'Giày cầu lông Yonex Power Cushion 88 Dial 3', 'Sở hữu hệ thống thắt dây BOA kép thế hệ thứ 3, cho phép điều chỉnh độ ôm ở cả vùng mũi chân và cổ chân. Giày mang lại sự tiện lợi tối đa và độ vừa vặn hoàn hảo như được đo đóng riêng cho từng cá nhân.', 2, 'Yonex', 'assets/uploads/image_1775290728032.jpg', 5, 2750000.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(24, 'Giày cầu lông Yonex Comfort Z3 Wide Mid', 'Thiết kế cổ Mid ôm cao bảo vệ cổ chân cùng form Wide dành cho người có bàn chân bè. Công nghệ đệm Comfort mang lại cảm giác êm ái suốt cả ngày dài thi đấu, giảm thiểu mệt mỏi cho khớp gối và bàn chân.', 2, 'Yonex', 'assets/uploads/image_1775294961935.jpg', 12, 1650000.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(25, 'Giày cầu lông Yonex Cascade Accel 2026', 'Mẫu giày tầm trung tối ưu cho lực bật nhảy. Thiết kế trẻ trung, hiện đại kết hợp với đế Radial Blade Sole giúp tăng cường độ bám sân theo mọi hướng, hỗ trợ người chơi thực hiện những cú nhảy đập cầu uy lực.', 2, 'Yonex', 'assets/uploads/image_1775290752650.jpg', 8, 550000.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(26, 'Giày cầu lông Yonex Strider Flow 2026', 'Sự kết hợp hoàn hảo giữa độ bền và sự thoải mái. Với lớp lưới thoát khí lớn trên thân giày, Strider Flow giúp đôi chân luôn khô thoáng ngay cả trong những trận cầu căng thẳng nhất, phù hợp cho tập luyện cường độ cao.', 2, 'Yonex', 'assets/uploads/image_1775294624544.jpg', 10, 600000.00, 20.00, 'visible', '2026-03-28 19:51:01'),
(27, 'Giày cầu lông Yonex Power Cushion Infinity 2', 'Đỉnh cao của công nghệ giày cầu lông với hệ thống điều chỉnh độ ôm 3D tự động. Infinity 2 không chỉ bảo vệ đôi chân mà còn là một tác phẩm công nghệ, mang lại trải nghiệm thi đấu đẳng cấp và khác biệt hoàn toàn.', 2, 'Yonex', 'assets/uploads/image_1775294168805.jpg', 0, 0.00, 20.00, 'hidden', '2026-03-28 19:51:01');


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
(41, '2026-04-04 13:18:00', NULL, 'completed'),
(42, '2026-04-07 22:07:00', NULL, 'completed'),
(43, '2026-04-01 22:08:00', NULL, 'completed'),
(44, '2026-04-03 22:14:00', NULL, 'completed'),
(45, '2026-04-05 22:16:00', NULL, 'completed'),
(46, '2026-04-02 22:17:00', NULL, 'completed'),
(47, '2026-04-04 22:39:00', NULL, 'completed');

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
(72, 42, 18, 10, 750000.00, 1),
(73, 42, 19, 15, 800000.00, 1),
(74, 43, 7, 8, 1500000.00, 1),
(75, 43, 24, 12, 1650000.00, 1),
(76, 44, 4, 5, 2200000.00, 1),
(77, 44, 20, 10, 2450000.00, 1),
(78, 45, 17, 6, 3800000.00, 1),
(79, 45, 22, 8, 3200000.00, 2),
(80, 46, 23, 6, 2750000.00, 1),
(81, 47, 25, 8, 550000.00, 1),
(82, 47, 26, 10, 600000.00, 1);

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
  `is_reset` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `role`, `status`, `created_at`, `is_reset`) VALUES
(1, 'Admin Chính', 'admin@gmail.com', '$2y$10$gTq4Ot/Xf6GMVwM7ZuTeqONYPhAPWuDBHXWgcYolUR411vWhxO0P.', NULL, 'admin', 'active', '2026-03-28 09:38:04', 1),
(7, 'Admin Phụ', 'admin2@gmail.com', '$2y$10$YkmURMDW5jbJJS9FItidjO5cRYyZgNscIBjBrwXq9iyBj/KJy7U3q', '0987654321', 'admin', 'active', '2026-03-28 09:50:08', 1),
(9, 'Nguyễn Văn A', 'user1@gmail.com', '$2y$10$nz0r1oHd7.7Dcljd59wareLDCmHo2qIoG4MQ9PMGohHP2p1.1WHHW', '0978123456', 'customer', 'active', '2026-03-28 09:50:08', 1),
(11, 'Lê Minh C', 'user3@gmail.com', '$2y$10$/x/xYvnLZOFCA5rGGN2GK.HRI9W8rxy6UJIqpo5FUDBVQ/STVMPAu', '0965432109', 'customer', 'active', '2026-03-28 09:50:08', 1),
(14, 'Đinh Công Thành', 'obitohaha63@gmail.com', '$2y$10$zh1VEJmqoBHJZzA3sozcNekmEjYlOojk0pjTeSAIVdXJvVqXYEf3O', '0796556438', 'customer', 'active', '2026-04-03 13:57:45', 0);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `purchase_orders`
--
ALTER TABLE `purchase_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `purchase_order_items`
--
ALTER TABLE `purchase_order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
