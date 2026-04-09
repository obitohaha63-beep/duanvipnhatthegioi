<?php
include 'db.php';

header('Content-Type: application/json');

$data = [];

try {

    // 1. Tổng người dùng
    $stmt = $conn->prepare("
        SELECT COUNT(*) AS total
        FROM users
        WHERE role = :role
    ");
    $stmt->execute(['role' => 'customer']);
    $data['users'] = (int)$stmt->fetch(PDO::FETCH_ASSOC)['total'];


    // 2. Tổng sản phẩm
    $stmt = $conn->prepare("
        SELECT COUNT(*) AS total
        FROM products
    ");
    $stmt->execute();
    $data['products'] = (int)$stmt->fetch(PDO::FETCH_ASSOC)['total'];


    // FIX TỒN KHO (NHẬP - XUẤT HỢP LỆ)
    $stmt = $conn->prepare("
        SELECT
            COALESCE(SUM(poi.quantity), 0)
            - COALESCE(SUM(
                CASE
                    WHEN o.status IN ('confirmed', 'delivered')
                    THEN oi.quantity
                    ELSE 0
                END
            ), 0) AS total_stock
        FROM products p
        LEFT JOIN purchase_order_items poi
            ON p.id = poi.product_id
        LEFT JOIN order_items oi
            ON p.id = oi.product_id
        LEFT JOIN orders o
            ON oi.order_id = o.id
    ");
    $stmt->execute();
    $data['stock'] = (int)$stmt->fetch(PDO::FETCH_ASSOC)['total_stock'];


    // FIX DOANH THU (chỉ tính đơn hợp lệ)
    $stmt = $conn->prepare("
        SELECT SUM(total_amount) AS total
        FROM orders
        WHERE status = 'delivered'
    ");
    $stmt->execute();
    $data['revenue'] = (float)($stmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 0);


    echo json_encode($data);

} catch (PDOException $e) {

    http_response_code(500);
    echo json_encode([
        'error' => 'Database error',
        'message' => $e->getMessage()
    ]);
    exit;
}
