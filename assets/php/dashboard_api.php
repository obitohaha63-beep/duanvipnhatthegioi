<?php
include 'db.php'; // file kết nối DB PDO

header('Content-Type: application/json');

$data = [];

try {
    // 1. Tổng người dùng
    $stmt = $conn->prepare("SELECT COUNT(*) AS total FROM users WHERE role = :role");
    $stmt->execute(['role' => 'customer']);
    $data['users'] = (int)$stmt->fetch(PDO::FETCH_ASSOC)['total'];

    // 2. Tổng sản phẩm
    $stmt = $conn->prepare("SELECT COUNT(*) AS total FROM products");
    $stmt->execute();
    $data['products'] = (int)$stmt->fetch(PDO::FETCH_ASSOC)['total'];

    // 3. Tổng tồn kho
    $stmt = $conn->prepare("SELECT SUM(quantity) AS total FROM products");
    $stmt->execute();
    $data['stock'] = (int)($stmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 0);

    // 4. Tổng doanh thu
    $stmt = $conn->prepare("SELECT SUM(total_amount) AS total FROM orders WHERE status = :status");
    $stmt->execute(['status' => 'confirmed']);
    $data['revenue'] = (float)($stmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 0);

    // Trả JSON
    echo json_encode($data);

} catch (PDOException $e) {
    // Nếu lỗi DB, trả JSON lỗi
    http_response_code(500);
    echo json_encode([
        'error' => 'Database error',
        'message' => $e->getMessage()
    ]);
    exit;
}