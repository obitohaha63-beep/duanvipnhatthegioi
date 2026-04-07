<?php
header('Content-Type: application/json; charset=utf-8');
include 'db.php';

$fromDate = $_GET['fromDate'] ?? '';
$toDate = $_GET['toDate'] ?? '';
$status = $_GET['status'] ?? '';
$ward = $_GET['ward'] ?? '';

$sql = "
SELECT 
    orders.id,
    orders.order_date,
    orders.total_amount,
    orders.status,
    users.name AS customer_name,
    ua.ward
FROM orders
JOIN users ON orders.user_id = users.id
LEFT JOIN user_address ua ON users.id = ua.user_id AND ua.is_default = 1
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
    
    $statusList = explode(',', $status);
    
    
    $placeholders = implode(',', array_fill(0, count($statusList), '?'));
    
    $sql .= " AND orders.status IN ($placeholders)";
    
    
    $params = array_merge($params, $statusList);
}

if ($ward) {
    $sql .= " AND ua.ward LIKE ?";
    $params[] = "%" . $ward . "%";
}

$sql .= " ORDER BY orders.id DESC";

try {
    $stmt = $conn->prepare($sql);
    $stmt->execute($params);
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "orders" => $orders
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>