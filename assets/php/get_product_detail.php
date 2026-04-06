<?php
header("Content-Type: application/json");
require "db.php";

$id = $_GET['id'] ?? 0;

if (!$id) {
    echo json_encode(["error" => "Thiếu ID sản phẩm"]);
    exit;
}

// JOIN bảng products với bảng categories để lấy tên danh mục (category_name)
$sql = "SELECT p.*, 
        c.name AS category_name,
        (p.cost_price * (1 + p.profit_rate/100)) AS selling_price
        FROM products p
        JOIN categories c ON p.category_id = c.id
        WHERE p.id = :id";

$stmt = $conn->prepare($sql);
$stmt->execute([':id' => $id]);

// Dùng fetch() vì chỉ lấy 1 sản phẩm duy nhất
$product = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$product) {
    echo json_encode(["error" => "Không tìm thấy sản phẩm"]);
    exit;
}

// Trả về dữ liệu gọn gàng (đã bỏ color và size)
$data = [
    "id" => $product["id"],
    "name" => $product["name"],
    "description" => $product["description"],
    "image_url" => $product["image_url"],
    "brand" => $product["brand"],
    "category_id" => $product["category_id"],
    "category_name" => $product["category_name"], 
    "cost_price" => $product["cost_price"],
    "profit_rate" => $product["profit_rate"],
    "selling_price" => $product["selling_price"], 
    "quantity" => $product["quantity"],
    "status" => $product["status"]
];

echo json_encode(["success" => true, "product" => $data]);