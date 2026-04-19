<?php
session_start();
header('Content-Type: application/json');
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$cart_id = intval($data['cart_id'] ?? 0);
$quantity = $data['quantity'] ?? null;

// ---- Validate phía server ----

// Validate cart_id hợp lệ
if ($cart_id <= 0) {
    echo json_encode(["success" => false, "message" => "ID giỏ hàng không hợp lệ."]);
    exit;
}

// Validate quantity phải là số nguyên
if (!is_numeric($quantity) || intval($quantity) != $quantity) {
    echo json_encode(["success" => false, "message" => "Số lượng phải là số nguyên hợp lệ."]);
    exit;
}

$quantity = intval($quantity);

// Validate quantity tối thiểu là 1
if ($quantity < 1) {
    echo json_encode(["success" => false, "message" => "Số lượng không thể nhỏ hơn 1."]);
    exit;
}

// Validate quantity tối đa không vượt tồn kho
$sqlStock = "SELECT p.quantity AS stock
             FROM cart c
             JOIN products p ON c.product_id = p.id
             WHERE c.id = ?";
$stmtStock = $conn->prepare($sqlStock);
$stmtStock->execute([$cart_id]);
$row = $stmtStock->fetch(PDO::FETCH_ASSOC);

if (!$row) {
    echo json_encode(["success" => false, "message" => "Không tìm thấy sản phẩm trong giỏ hàng."]);
    exit;
}

if ($quantity > $row['stock']) {
    echo json_encode([
        "success"  => false,
        "message"  => "Số lượng vượt quá tồn kho. Tối đa có thể mua: {$row['stock']} sản phẩm."
    ]);
    exit;
}

// ---- Cập nhật database ----
$sql = "UPDATE cart SET quantity = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$quantity, $cart_id]);

echo json_encode(["success" => true]);