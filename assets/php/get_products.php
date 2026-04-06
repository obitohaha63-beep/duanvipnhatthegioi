<?php
header("Content-Type: application/json");
require "db.php";

try {
    $stmt = $conn->query("
        SELECT p.id, p.name, p.image_url, c.name AS category, p.brand, 
               p.cost_price, p.profit_rate, p.quantity, p.status, p.description, p.created_at
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        ORDER BY p.id DESC
    ");
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success'=>true, 'data'=>$products]);
} catch(PDOException $e){
    echo json_encode(['success'=>false, 'message'=>'Lỗi DB: '.$e->getMessage()]);
}