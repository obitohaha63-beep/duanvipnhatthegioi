<?php
header('Content-Type: application/json; charset=utf-8');
include __DIR__ . '/db.php';

try {
    
    $sqlProducts = "SELECT p.id, p.name, p.quantity, p.cost_price, p.profit_rate,
                    ROUND(p.cost_price * (1 + p.profit_rate / 100)) AS selling_price,
                    c.id AS category_id,
                    c.name AS category
                    FROM products p
                    LEFT JOIN categories c ON p.category_id = c.id
                    WHERE p.status='visible'";
    $stmt = $conn->prepare($sqlProducts);
    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    
    $stmtCat = $conn->prepare("SELECT id, name FROM categories ORDER BY name ASC");
    $stmtCat->execute();
    $categories = $stmtCat->fetchAll(PDO::FETCH_ASSOC);

    
    echo json_encode([
        "products" => $products,
        "categories" => $categories
    ], JSON_UNESCAPED_UNICODE);

} catch(PDOException $e){
    echo json_encode(["error" => true, "message" => $e->getMessage()]);
}