<?php
header("Content-Type: application/json");
require "db.php";

$id = $_GET['id'] ?? 0;

if (!$id) {
    echo json_encode([
        "success" => false,
        "message" => "Thiếu ID sản phẩm"
    ]);
    exit;
}

try {

    
    $stmt = $conn->prepare("
        SELECT COUNT(*) 
        FROM purchase_order_items 
        WHERE product_id = ?
    ");
    $stmt->execute([$id]);
    $importCount = $stmt->fetchColumn();

    
    $stmt = $conn->prepare("
        SELECT COUNT(*) 
        FROM order_items 
        WHERE product_id = ?
    ");
    $stmt->execute([$id]);
    $orderCount = $stmt->fetchColumn();

    
    if ($importCount == 0 && $orderCount == 0) {

        $stmt = $conn->prepare("DELETE FROM products WHERE id = ?");
        $stmt->execute([$id]);

        echo json_encode([
            "success" => true,
            "message" => "Đã xóa sản phẩm khỏi hệ thống"
        ]);
    } 
    
    else {

        $stmt = $conn->prepare("
            UPDATE products 
            SET status = 'hidden' 
            WHERE id = ?
        ");
        $stmt->execute([$id]);

        echo json_encode([
            "success" => true,
            "message" => "Sản phẩm đã phát sinh dữ liệu nên chỉ được chuyển sang ẩn"
        ]);
    }

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}