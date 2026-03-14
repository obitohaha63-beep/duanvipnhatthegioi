<?php
require "db.php";

header("Content-Type: application/json; charset=UTF-8");

if(isset($_GET["code"])){

    $code = $_GET["code"];

    $stmt = $pdo->prepare("
    SELECT 
        p.*,
        c.name AS category_name,
        b.name AS brand_name,
        pa.weight,
        pa.balance,
        pa.play_style,
        pa.skill_level
    FROM products p
    JOIN categories c 
        ON p.category_id = c.id
    LEFT JOIN brands b
        ON p.brand_id = b.id
    LEFT JOIN product_attributes pa
        ON p.id = pa.product_id
    WHERE p.product_code = ?
");

    $stmt->execute([$code]);

    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if($product){

        // lấy danh sách hình ảnh
        $imgStmt = $pdo->prepare("
            SELECT image_url
            FROM product_images
            WHERE product_id = ?
        ");

        $imgStmt->execute([$product["id"]]);

        $product["images"] = $imgStmt->fetchAll(PDO::FETCH_COLUMN);

        echo json_encode($product);

    }else{

        echo json_encode([
            "error" => "Product not found"
        ]);
    }

}else{

     $stmt = $pdo->query("
        SELECT 
        p.*,
        c.name AS category_name,
        b.name AS brand_name,
        pa.weight,
        pa.balance,
        pa.play_style,
        pa.skill_level
        FROM products p
        JOIN categories c ON p.category_id = c.id
        LEFT JOIN brands b ON p.brand_id = b.id
        LEFT JOIN product_attributes pa ON p.id = pa.product_id
    ");

    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach($products as &$product){

        $imgStmt = $pdo->prepare("
            SELECT image_url
            FROM product_images
            WHERE product_id = ?
        ");

        $imgStmt->execute([$product["id"]]);

        $product["images"] = $imgStmt->fetchAll(PDO::FETCH_COLUMN);

    }

    echo json_encode($products);
}
?>