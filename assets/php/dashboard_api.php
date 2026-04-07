<?php
include 'db.php'; 

header('Content-Type: application/json');

$data = [];

try {
    
    $stmt = $conn->prepare("SELECT COUNT(*) AS total FROM users WHERE role = :role");
    $stmt->execute(['role' => 'customer']);
    $data['users'] = (int)$stmt->fetch(PDO::FETCH_ASSOC)['total'];

    
    $stmt = $conn->prepare("SELECT COUNT(*) AS total FROM products");
    $stmt->execute();
    $data['products'] = (int)$stmt->fetch(PDO::FETCH_ASSOC)['total'];

    
    $stmt = $conn->prepare("SELECT SUM(quantity) AS total FROM products");
    $stmt->execute();
    $data['stock'] = (int)($stmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 0);

    
    $stmt = $conn->prepare("SELECT SUM(total_amount) AS total FROM orders WHERE status = :status");
    $stmt->execute(['status' => 'confirmed']);
    $data['revenue'] = (float)($stmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 0);

    
    echo json_encode($data);

} catch (PDOException $e) {
    
    http_response_code(500);
    echo json_encode([
        'error' => 'Database error',
        'message' => $e->getMessage()
    ]);
    exit;
}