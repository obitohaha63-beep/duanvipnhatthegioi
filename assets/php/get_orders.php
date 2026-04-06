<?php
header('Content-Type: application/json; charset=utf-8');
include 'db.php';

$fromDate = $_GET['fromDate'] ?? '';
$toDate = $_GET['toDate'] ?? '';
$status = $_GET['status'] ?? ''; // Giả sử JS gửi: 'delivered,confirmed'

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

// --- PHẦN THAY ĐỔI Ở ĐÂY ---
if ($status) {
    // Chuyển chuỗi 'delivered,confirmed' thành mảng ['delivered', 'confirmed']
    $statusList = explode(',', $status);
    
    // Tạo chuỗi dấu hỏi chấm (?,?) tương ứng với số lượng phần tử
    $placeholders = implode(',', array_fill(0, count($statusList), '?'));
    
    $sql .= " AND orders.status IN ($placeholders)";
    
    // Gộp mảng status vào mảng params chung
    $params = array_merge($params, $statusList);
}
// ---------------------------

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