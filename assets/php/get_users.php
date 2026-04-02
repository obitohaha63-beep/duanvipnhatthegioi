<?php
session_start();
header('Content-Type: application/json; charset=utf-8');

require "db.php";

// check login
if (!isset($_SESSION['user'])) {
    echo json_encode([
        "success" => false,
        "message" => "Chưa đăng nhập"
    ]);
    exit;
}

$user_id = $_SESSION['user']['id'];

try {

    // lấy user
    $stmt = $conn->prepare("SELECT id, name, phone FROM users WHERE id = ?");
    $stmt->execute([$user_id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // lấy địa chỉ mặc định
    $stmt2 = $conn->prepare("
        SELECT city, district, ward, detail_address
        FROM user_address
        WHERE user_id = ? AND is_default = 1
        LIMIT 1
    ");
    $stmt2->execute([$user_id]);
    $address = $stmt2->fetch(PDO::FETCH_ASSOC);

    // ghép địa chỉ
    $full_address = "";

    if ($address) {
        $full_address =
            ($address['detail_address'] ?? '') . ', ' .
            ($address['ward'] ?? '') . ', ' .
            ($address['district'] ?? '') . ', ' .
            ($address['city'] ?? '');
    }

    echo json_encode([
        "success" => true,
        "user" => [
            "id" => $user['id'],
            "name" => $user['name'],
            "phone" => $user['phone'],
            "default_address" => $full_address
        ]
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Lỗi server",
        "error" => $e->getMessage()
    ]);
}