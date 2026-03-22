<?php
require "db.php";

try {
    $stmt = $pdo->query("
        SELECT p.*, c.name as category_name 
        FROM products p 
        JOIN categories c ON p.category_id = c.id 
        ORDER BY p.id DESC
    ");
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $result = [];

    foreach($products as $prod){
        // Lấy attributes của sản phẩm này
        $stmt2 = $pdo->prepare("
            SELECT ca.name as attr_name, pa.value 
            FROM product_attributes pa
            JOIN category_attributes ca ON pa.attribute_id = ca.id
            WHERE pa.product_id = ?
        ");
        $stmt2->execute([$prod['id']]);
        $attributes = $stmt2->fetchAll(PDO::FETCH_ASSOC);

        $prod['attributes'] = $attributes; // thêm vào mảng sản phẩm
        $result[] = $prod;
    }

    echo json_encode(['status'=>'success','data'=>$result]);

} catch (Exception $e){
    echo json_encode(['status'=>'error','message'=>$e->getMessage()]);
}
?>