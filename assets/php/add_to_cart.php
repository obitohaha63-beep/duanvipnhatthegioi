<?php
session_start();
header('Content-Type: application/json');
require "db.php";

// ✅ kiểm tra đăng nhập
if (!isset($_SESSION['user'])) {
    echo json_encode([
        "success" => false,
        "message" => "Chưa đăng nhập"
    ]);
    exit;
}

$user_id = $_SESSION['user']['id']; // 🔥 sửa ở đây

$data = json_decode(file_get_contents("php://input"), true);

$product_id = $data['product_id'] ?? null;
$quantity = $data['quantity'] ?? 1;
$color = $data['color'] ?? null;
$size = $data['size'] ?? null;

if (!$product_id) {
    echo json_encode([
        "success" => false,
        "message" => "Thiếu product_id"
    ]);
    exit;
}

// phần dưới giữ nguyên

try {
    // 🔥 kiểm tra đã tồn tại chưa (cùng product + size + color)
    $sql = "SELECT * FROM cart 
            WHERE user_id = :user_id 
            AND product_id = :product_id 
            AND color = :color 
            AND size = :size";

    $stmt = $conn->prepare($sql);
    $stmt->execute([
        ":user_id" => $user_id,
        ":product_id" => $product_id,
        ":color" => $color,
        ":size" => $size
    ]);

    $existing = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existing) {
        // 🔥 nếu đã có → cộng số lượng
        $update = $conn->prepare("
            UPDATE cart 
            SET quantity = quantity + :quantity
            WHERE id = :id
        ");

        $update->execute([
            ":quantity" => $quantity,
            ":id" => $existing['id']
        ]);
    } else {
        // 🔥 chưa có → insert
        $insert = $conn->prepare("
            INSERT INTO cart (user_id, product_id, quantity, color, size)
            VALUES (:user_id, :product_id, :quantity, :color, :size)
        ");

        $insert->execute([
            ":user_id" => $user_id,
            ":product_id" => $product_id,
            ":quantity" => $quantity,
            ":color" => $color,
            ":size" => $size
        ]);
    }

    echo json_encode([
        "success" => true,
        "message" => "Đã thêm vào giỏ hàng"
    ]);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Lỗi server",
        "error" => $e->getMessage()
    ]);
}