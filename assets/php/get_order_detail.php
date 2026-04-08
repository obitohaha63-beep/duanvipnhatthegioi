<?php
session_start();
header('Content-Type: application/json; charset=utf-8');
include 'db.php';

// Kiểm tra đăng nhập
if (!isset($_SESSION['user'])) {
    echo json_encode([
        "success" => false,
        "message" => "Chưa đăng nhập"
    ]);
    exit;
}

$user_id = $_SESSION['user']['id'];
$id = $_GET['id'] ?? null;

if (!$id) {
    echo json_encode([
        "success" => false,
        "message" => "Thiếu id đơn hàng"
    ]);
    exit;
}

try {

    $stmt = $conn->prepare("
        SELECT
    o.*,
    u.name AS customer_name,
    u.phone,
    o.delivery_address AS full_address
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE o.id = ? AND o.user_id = ?
    ");

    $stmt->execute([$id, $user_id]);
    $order = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$order) {
        echo json_encode([
            "success" => false,
            "message" => "Không tìm thấy đơn hàng hoặc bạn không có quyền xem"
        ]);
        exit;
    }

    $stmt2 = $conn->prepare("
        SELECT
            order_items.*,
            products.name AS product_name
        FROM order_items
        JOIN products ON order_items.product_id = products.id
        WHERE order_items.order_id = ?
    ");

    $stmt2->execute([$id]);
    $items = $stmt2->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "order" => $order,
        "items" => $items
    ]);

} catch(PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>
