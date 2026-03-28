START TRANSACTION;

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Vợt cầu lông'),
(2, 'Giày cầu lông');

INSERT INTO `products` (`id`, `name`, `description`, `category_id`, `color`, `brand`, `size`, `image_url`, `quantity`, `cost_price`, `profit_rate`, `status`) VALUES
-- NHÓM 1: VỢT CẦU LÔNG LINING (ID 1 - 9)
(1, 'Vợt cầu lông Lining Axforce 100', 'Vợt thiên công cao cấp dành cho vận động viên chuyên nghiệp', 1, 'Black golden, Vàng golden', 'Lining', '3U,4U', 'astrox99pro.jpg', 15, 3500000.00, 25.00, 'visible'),
(2, 'Vợt cầu lông Lining Aeronaut 9000C', 'Vợt thiên công cao cấp dành cho vận động viên chuyên nghiệp', 1, 'Black, Red', 'Lining', '3U,4U', 'aeronaut_9000c.jpg', 10, 3000000.00, 30.00, 'visible'),
(3, 'Vợt cầu lông Lining Aeronaut 7000C', 'Vợt thiên công cao cấp dành cho vận động viên chuyên nghiệp', 1, 'Black, Orange', 'Lining', '3U,4U', 'aeronaut_7000c.jpg', 12, 2800000.00, 30.00, 'visible'),
(4, 'Vợt cầu lông Lining Turbo Charging 75', 'Vợt thiên công cao cấp dành cho vận động viên chuyên nghiệp', 1, 'Red, Black', 'Lining', '3U,4U', 'turbo_charging_75.jpg', 15, 2700000.00, 30.00, 'visible'),
(5, 'Vợt cầu lông Lining 3D Calibar 900', 'Vợt cầu lông cao cấp dòng Calibar', 1, 'Black, Grey', 'Lining', '3U,4U', '3d_calibar_900.jpg', 15, 3200000.00, 30.00, 'visible'),
(6, 'Vợt cầu lông Lining Windstorm 78', 'Vợt thiên công cao cấp dành cho vận động viên chuyên nghiệp', 1, 'White, Blue', 'Lining', '3U,4U', 'windstorm_78.jpg', 11, 1800000.00, 30.00, 'visible'),
(7, 'Vợt cầu lông Lining N7-II', 'Vợt cầu lông cao cấp N7 phiên bản 2', 1, 'White, Red', 'Lining', '3U,4U', 'n7_ii.jpg', 9, 3100000.00, 30.00, 'visible'),
(8, 'Vợt cầu lông Lining G-Force Superlite 80', 'Dòng vợt siêu nhẹ G-Force', 1, 'Black, Yellow', 'Lining', '3U,4U', 'gforce_superlite_80.jpg', 12, 1200000.00, 30.00, 'visible'),
(9, 'Vợt cầu lông Lining Super Series 26', 'Dòng vợt phổ thông Super Series', 1, 'Black, Silver', 'Lining', '3U,4U', 'super_series_26.jpg', 10, 950000.00, 30.00, 'visible'),

-- NHÓM 2: VỢT CẦU LÔNG YONEX (ID 10 - 18)
(10, 'Yonex Astrox 100VA ZZ', 'Siêu phẩm kết hợp cùng Viktor Axelsen, công nghệ Rotational Generator System tối tân', 2, 'Lightning Yellow', 'Yonex', '3U,4U', 'astrox_100va_zz.jpg', 10, 4200000.00, 20.00, 'visible'),
(11, 'Yonex Nanoflare 1000Z', 'Vợt có tốc độ vung nhanh nhất thế giới, thiết kế Wide Profile Frame', 1, 'Lightning Yellow', 'Yonex', '3U,4U', 'nanoflare_1000z.jpg', 15, 4100000.00, 20.00, 'visible'),
(12, 'Yonex Astrox 88D Pro Gen 3', 'Thế hệ thứ 3 tối ưu cho người chơi cầu sau (Dominate)', 1, 'Black/Silver', 'Yonex', '3U,4U', 'astrox_88d_pro_g3.jpg', 20, 3950000.00, 20.00, 'visible'),
(13, 'Yonex Astrox 88S Pro Gen 3', 'Thế hệ thứ 3 tối ưu cho người chơi cầu trước (Decisive)', 1, 'Emerald Blue', 'Yonex', '3U,4U', 'astrox_88s_pro_g3.jpg', 18, 3950000.00, 20.00, 'visible'),
(14, 'Yonex Arcsaber 11 Pro', 'Vợt công thủ toàn diện huyền thoại, khả năng điều cầu chính xác', 1, 'Grayish Pearl', 'Yonex', '3U,4U', 'arcsaber_11_pro.jpg', 12, 3850000.00, 20.00, 'visible'),
(15, 'Yonex Nanoflare 800 Pro', 'Thiết kế khung Sonic Flare System cho những pha phản tạt chớp nhoáng', 1, 'Deep Green', 'Yonex', '3U,4U', 'nanoflare_800_pro.jpg', 14, 3700000.00, 20.00, 'visible'),
(16, 'Yonex Astrox 77 Pro', 'Vợt thiên công linh hoạt, phù hợp cho cả đơn và đôi', 1, 'High Orange', 'Yonex', '3U,4U', 'astrox_77_pro.jpg', 25, 3600000.00, 20.00, 'visible'),
(17, 'Yonex Nanoflare 700 Pro 2025', 'Phiên bản cải tiến giúp giảm rung chấn tối đa', 1, 'Midnight Blue', 'Yonex', '4U,5U', 'nanoflare_700_pro_2025.jpg', 16, 3650000.00, 20.00, 'visible'),
(18, 'Yonex Arcsaber 11 Play', 'Phiên bản phổ thông của Arc 11 Pro, cực kỳ dễ chơi', 1, 'Grayish Pearl', 'Yonex', '4U', 'arcsaber_11_play.jpg', 60, 1650000.00, 20.00, 'visible'),

-- NHÓM 3: GIÀY CẦU LÔNG YONEX (ID 19 - 27)
(19, 'Yonex Subaxia GT Men 2026', 'Dòng giày cao cấp mới nhất 2026, tối ưu sự ổn định', 2, 'Dark Gray', 'Yonex', '39-45', 'subaxia_gt_men.jpg', 15, 3450000.00, 20.00, 'visible'),
(20, 'Yonex Power Cushion 65Z4 VA', 'Phiên bản đặc biệt Viktor Axelsen 2026', 2, 'Grayish Beige', 'Yonex', '39-45', '65z4_va_collection.jpg', 20, 3180000.00, 20.00, 'visible'),
(21, 'Yonex Power Cushion Aerus Z3', 'Đôi giày nhẹ nhất thế giới năm 2026', 2, 'Flash Green', 'Yonex', '37-44', 'aerus_z3_green.jpg', 10, 3300000.00, 20.00, 'visible'),
(22, 'Yonex Eclipsion Z3 Men 2026', 'Chuyên gia bảo vệ cổ chân với độ bám sân cực cao', 2, 'Navy Blue', 'Yonex', '39-45', 'eclipsion_z3_navy.jpg', 15, 3150000.00, 20.00, 'visible'),
(23, 'Yonex Power Cushion 88 Dial 3', 'Hệ thống thắt dây BOA kép thế hệ 3', 2, 'Black/Ice Blue', 'Yonex', '39-44', '88_dial_3_black.jpg', 8, 3600000.00, 20.00, 'visible'),
(24, 'Yonex Comfort Z3 Wide Mid', 'Thiết kế cổ cao bảo vệ toàn diện cổ chân', 2, 'Off White/Red', 'Yonex', '40-45', 'comfort_z3_mid.jpg', 7, 3200000.00, 20.00, 'visible'),
(25, 'Yonex Cascade Accel 2026', 'Dòng giày tầm trung hỗ trợ lực bật nhảy tốt', 2, 'White/Sky Blue', 'Yonex', '37-44', 'cascade_accel_2026.jpg', 25, 1850000.00, 20.00, 'visible'),
(26, 'Yonex Strider Flow 2026', 'Mẫu giày tập luyện chuyên nghiệp, bền bỉ', 2, 'Black/Blue', 'Yonex', '38-45', 'strider_flow_black.jpg', 30, 1250000.00, 20.00, 'visible'),
(27, 'Yonex Power Cushion Infinity 2', 'Hệ thống điều chỉnh độ ôm 3D đỉnh cao', 2, 'Metallic Gold', 'Yonex', '40-44', 'infinity_2_gold.jpg', 5, 4500000.00, 20.00, 'visible');

INSERT INTO `users` VALUES
(1, 'Admin Chính', 'admin@gmail.com', '$2y$10$...', NULL, 'admin', 'active', '2026-03-28 09:38:04', 1, '12 Nguyễn Trãi, Quận 5, TP.HCM'),
(7, 'Admin Phụ', 'admin2@gmail.com', '$2y$10$...', '0987654321', 'admin', 'active', '2026-03-28 09:50:08', 0, '12 Nguyễn Huệ, Quận 1, TP.HCM'),
(8, 'Admin Phụ', 'admin3@gmail.com', '$2y$10$...', '0912345678', 'admin', 'active', '2026-03-28 09:50:08', 0, '45 Lê Lợi, Hoàn Kiếm, Hà Nội'),
(9, 'Nguyễn Văn A', 'user1@gmail.com', '$2y$10$...', '0978123456', 'customer', 'active', '2026-03-28 09:50:08', 0, NULL),
(10, 'Trần Thị B', 'user2@gmail.com', '$2y$10$...', '0934567890', 'customer', 'locked', '2026-03-28 09:50:08', 0, NULL),
(11, 'Lê Minh C', 'user3@gmail.com', '$2y$10$...', '0965432109', 'customer', 'active', '2026-03-28 09:50:08', 0, NULL);

COMMIT;