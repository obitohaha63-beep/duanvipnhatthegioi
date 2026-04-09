<?php
session_start();
header('Content-Type: application/json; charset=utf-8');
include 'db.php';

// Kiểm tra đăng nhập
if (!isset($_SESSION['user'])) {
    echo json_encode([
        "success" => false,
        "message" => "Chưa đăng nhập"
    ]);
    exit;
}

$user_id = $_SESSION['user']['id'];
$user_role = $_SESSION['user']['role'] ?? '';

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

// Nếu không phải admin, chỉ xem đơn hàng của chính mình
if ($user_role !== 'admin') {
    $sql .= " AND orders.user_id = ?";
    $params[] = $user_id;
}

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
