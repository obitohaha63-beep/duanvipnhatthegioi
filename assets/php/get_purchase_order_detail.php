<?php
header('Content-Type: application/json; charset=utf-8');
include __DIR__ . '/db.php';

$id = $_GET['id'] ?? null;

if (!$id) {
    echo json_encode([
        "success" => false,
        "message" => "Thiếu mã phiếu nhập"
    ]);
    exit;
}

try {
    // Lấy thông tin phiếu nhập
    $stmt = $conn->prepare("
        SELECT id, order_date, status
        FROM purchase_orders
        WHERE id = ?
    ");
    $stmt->execute([$id]);
    $order = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$order) {
        echo json_encode([
            "success" => false,
            "message" => "Không tìm thấy phiếu nhập"
        ]);
        exit;
    }

    // Lấy danh sách sản phẩm kèm số lần nhập lớn nhất
    $stmt = $conn->prepare("
        SELECT 
            p.id AS product_id,
            p.name AS product_name,
            poi.quantity,
            poi.import_price,
            -- Lấy số lần nhập lớn nhất từng sản phẩm trong bảng
            (SELECT MAX(number_import_times) 
             FROM purchase_order_items 
             WHERE product_id = poi.product_id) AS number_import_times
        FROM purchase_order_items poi
        JOIN products p ON poi.product_id = p.id
        WHERE poi.purchase_order_id = ?
        GROUP BY poi.product_id
    ");

    $stmt->execute([$id]);
    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($items as &$item) {
        $item['number_import_times'] = (int)$item['number_import_times'];
    }

    echo json_encode([
        "success" => true,
        "order" => $order,
        "items" => $items
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}