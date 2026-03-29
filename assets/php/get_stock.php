<?php
header('Content-Type: application/json; charset=utf-8');
include 'db.php';

$category = $_GET['category'] ?? '';
$warning = $_GET['warning'] ?? '';
$date = $_GET['date'] ?? '';

try {

    $sql = "
        SELECT 
            p.id,
            p.name,
            c.name AS category,
            p.quantity,
            MAX(po.order_date) AS last_update
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN purchase_order_items poi ON poi.product_id = p.id
        LEFT JOIN purchase_orders po ON po.id = poi.purchase_order_id
        WHERE 1=1
    ";

    if ($category !== '') {
        $sql .= " AND p.category_id = :category";
    }

    if ($date !== '') {
        $sql .= " AND (po.order_date IS NULL OR po.order_date <= :date)";
    }

    $sql .= " GROUP BY p.id, p.name, c.name, p.quantity";

    $stmt = $conn->prepare($sql);

    if ($category !== '') {
        $stmt->bindValue(':category', $category, PDO::PARAM_INT);
    }

    if ($date !== '') {
        $stmt->bindValue(':date', $date);
    }

    $stmt->execute();

    $data = [];

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

        if ($warning !== '' && $row['quantity'] > $warning) {
            continue;
        }

        $limit = ($warning !== '') ? $warning : 5;

        $row['status'] = ($row['quantity'] <= $limit)
            ? 'Sắp hết hàng'
            : 'Còn hàng';

        $data[] = $row;
    }

    echo json_encode([
        "success" => true,
        "data" => $data
    ]);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>