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

    // Lấy phiếu nhập
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

    // Lấy chi tiết sản phẩm
    $stmt = $conn->prepare("
        SELECT 
            p.name AS product_name,
            poi.quantity,
            poi.import_price,
            p.number_import_times
        FROM purchase_order_items poi
        JOIN products p ON poi.product_id = p.id
        WHERE poi.purchase_order_id = ?
    ");

    $stmt->execute([$id]);

    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

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
?>