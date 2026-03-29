<?php
header('Content-Type: application/json; charset=utf-8');
include 'db.php';

$fromDate = $_GET['fromDate'] ?? '';
$toDate = $_GET['toDate'] ?? '';
$status = $_GET['status'] ?? '';

$sql = "
SELECT 
    orders.id,
    orders.order_date,
    orders.total_amount,
    orders.status,
    users.name AS customer_name
FROM orders
JOIN users ON orders.user_id = users.id
WHERE 1=1
";

$params = [];

if ($fromDate) {
    $sql .= " AND DATE(orders.order_date) >= ?";
    $params[] = $fromDate;
}

if ($toDate) {
    $sql .= " AND DATE(orders.order_date) <= ?";
    $params[] = $toDate;
}

if ($status) {
    $sql .= " AND orders.status = ?";
    $params[] = $status;
}

$sql .= " ORDER BY orders.id DESC";

$stmt = $conn->prepare($sql);
$stmt->execute($params);

$orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "success" => true,
    "orders" => $orders
]);
?>