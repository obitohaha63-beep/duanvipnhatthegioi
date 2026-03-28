<?php
header('Content-Type: application/json; charset=utf-8');
include __DIR__ . '/db.php';

try {

    $from = $_GET['from'] ?? null;
    $to = $_GET['to'] ?? null;

    $sql = "
        SELECT 
            po.id,
            po.order_date,
            po.status,
            po.supplier_name,
            SUM(poi.quantity * poi.import_price) AS total_amount,
            COUNT(poi.id) AS product_count
        FROM purchase_orders po
        JOIN purchase_order_items poi 
            ON po.id = poi.purchase_order_id
    ";

    if ($from && $to) {
        $sql .= " WHERE po.order_date BETWEEN ? AND ? ";
    }

    $sql .= "
        GROUP BY po.id
        ORDER BY po.id DESC
    ";

    $stmt = $conn->prepare($sql);

    if ($from && $to) {
        $stmt->execute([$from, $to]);
    } else {
        $stmt->execute();
    }

    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "data" => $orders
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>