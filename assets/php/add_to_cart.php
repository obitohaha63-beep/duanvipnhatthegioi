<?php
session_start(); // Bắt buộc phải có để dùng $_SESSION
header('Content-Type: application/json');
require "db.php";

// BƯỚC 1: Kiểm tra xem người dùng đã đăng nhập chưa
if (!isset($_SESSION['user'])) {
    echo json_encode(["success" => false, "message" => "Chưa đăng nhập"]);
    exit;
}

$user_id = $_SESSION['user']['id'];

// Lấy dữ liệu gửi từ file Javascript (Fetch API)
$data = json_decode(file_get_contents("php://input"), true);

$product_id = $data['product_id'] ?? null;
$quantity = $data['quantity'] ?? 1;

if (!$product_id) {
    echo json_encode(["success" => false, "message" => "Thiếu mã sản phẩm"]);
    exit;
}

try {
    // BƯỚC 2: Kiểm tra xem trong giỏ hàng của user này đã có sản phẩm này chưa
    $sql = "SELECT id FROM cart WHERE user_id = :user_id AND product_id = :product_id";
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        ":user_id" => $user_id,
        ":product_id" => $product_id
    ]);

    $existing = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existing) {
        // Nếu ĐÃ CÓ trong giỏ -> Cộng dồn số lượng
        $update = $conn->prepare("UPDATE cart SET quantity = quantity + :quantity WHERE id = :id");
        $update->execute([
            ":quantity" => $quantity,
            ":id" => $existing['id']
        ]);
    } else {
        // Nếu CHƯA CÓ trong giỏ -> Tạo mới một dòng
        $insert = $conn->prepare("INSERT INTO cart (user_id, product_id, quantity) VALUES (:user_id, :product_id, :quantity)");
        $insert->execute([
            ":user_id" => $user_id,
            ":product_id" => $product_id,
            ":quantity" => $quantity
        ]);
    }

    echo json_encode(["success" => true, "message" => "Đã thêm vào giỏ hàng"]);

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Lỗi server", "error" => $e->getMessage()]);
}