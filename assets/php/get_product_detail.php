
<?php

header("Content-Type: application/json");
require "db.php";

$id = intval($_GET['id'] ?? 0);
if($id <= 0){
    echo json_encode(['success'=>false,'message'=>'ID sản phẩm không hợp lệ']);
    exit;
}

try {
    $stmt = $conn->prepare("
        SELECT p.id, p.category_id, p.name, p.image_url, p.brand, p.color, p.size, 
               p.cost_price, p.profit_rate, p.quantity, p.status, p.description
        FROM products p
        WHERE p.id = ?
    ");
    $stmt->execute([$id]);
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if($product){
        echo json_encode(['success'=>true, 'product'=>$product]);
    } else {
        echo json_encode(['success'=>false,'message'=>'Sản phẩm không tồn tại']);
    }
} catch(PDOException $e){
    echo json_encode(['success'=>false,'message'=>'Lỗi DB: '.$e->getMessage()]);
}
?>