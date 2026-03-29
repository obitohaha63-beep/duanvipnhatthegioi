<?php
header('Content-Type: application/json; charset=utf-8');
include 'db.php';

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
            orders.*,
            users.name AS customer_name,
            users.phone
        FROM orders
        JOIN users ON orders.user_id = users.id
        WHERE orders.id = ?
    ");

    $stmt->execute([$id]);
    $order = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$order) {
        echo json_encode([
            "success" => false,
            "message" => "Không tìm thấy đơn hàng"
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