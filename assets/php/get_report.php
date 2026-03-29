<?php
header("Content-Type: application/json");
require "db.php";

$keyword = $_GET['keyword'] ?? '';
$from = $_GET['from'] ?? '';
$to = $_GET['to'] ?? '';

try {

    $sql = "
        SELECT 
            p.id,
            p.name,

            COALESCE((
                SELECT SUM(poi.quantity)
                FROM purchase_order_items poi
                JOIN purchase_orders po ON poi.purchase_order_id = po.id
                WHERE poi.product_id = p.id
                AND po.order_date BETWEEN :fromDate AND :toDate
            ),0) AS imported,

            COALESCE((
                SELECT SUM(oi.quantity)
                FROM order_items oi
                JOIN orders o ON oi.order_id = o.id
                WHERE oi.product_id = p.id
                AND o.order_date BETWEEN :fromDate AND :toDate
            ),0) AS exported,

            p.quantity AS stock

        FROM products p
        WHERE p.name LIKE :keyword
    ";

    $stmt = $conn->prepare($sql);
    $stmt->execute([
        ':fromDate' => $from . ' 00:00:00',
        ':toDate' => $to . ' 23:59:59',
        ':keyword' => "%$keyword%"
    ]);

    echo json_encode([
        'success' => true,
        'data' => $stmt->fetchAll(PDO::FETCH_ASSOC)
    ]);

} catch(PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Lỗi DB: ' . $e->getMessage()
    ]);
}