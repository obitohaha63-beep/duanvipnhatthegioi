<?php
header('Content-Type: application/json; charset=utf-8');
include __DIR__ . '/db.php';

try {
    if (!isset($_GET['category_id'])) {
        echo json_encode([]);
        exit;
    }

    $category_id = intval($_GET['category_id']);

    $stmt = $conn->prepare("
        SELECT id, name 
        FROM products 
        WHERE category_id = :category_id
    ");
    $stmt->execute(['category_id' => $category_id]);
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // luôn trả về mảng (tránh trả về NULL)
    echo json_encode($products ?: []);

} catch (PDOException $e) {
    // Trả về JSON hợp lệ kể cả khi có lỗi
    echo json_encode([]);
}