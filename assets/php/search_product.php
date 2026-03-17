<?php
require "db.php";

header("Content-Type: application/json; charset=UTF-8");

if(isset($_GET["keyword"])){

$keyword = "%" . $_GET["keyword"] . "%";

$stmt = $pdo->prepare("
SELECT 
p.*,
c.name AS category_name,
b.name AS brand_name
FROM products p
JOIN categories c ON p.category_id = c.id
LEFT JOIN brands b ON p.brand_id = b.id

WHERE 
p.name LIKE ?
OR c.name LIKE ?
OR b.name LIKE ?
");

$stmt->execute([$keyword,$keyword,$keyword]);

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