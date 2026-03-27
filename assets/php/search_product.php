<?php
header('Content-Type: application/json');
require 'db.php';

try {
    // 1. Lấy keyword
    $keyword = $_GET['keyword'] ?? '';

    // Trim + tránh input rác
    $keyword = trim($keyword);

    if ($keyword === '') {
        echo json_encode([
            "status" => "success",
            "data" => []
        ]);
        exit;
    }

    // 2. Query sản phẩm (tìm theo tên + category)
    $stmt = $conn->prepare("
        SELECT 
            p.id,
            p.name,
            p.cost_price,
            p.profit_percent,
            c.name AS category_name,
            pi.image_url
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN product_images pi ON pi.product_id = p.id
        WHERE p.name LIKE :keyword
           OR c.name LIKE :keyword
        GROUP BY p.id
        ORDER BY p.id DESC
    ");

    $stmt->execute([
        ':keyword' => '%' . $keyword . '%'
    ]);

    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 3. Format dữ liệu trả về (đồng bộ với JS của em)
    $final = [];

    foreach ($products as $p) {

        // Tính giá bán
        $selling_price = $p['cost_price'] + ($p['cost_price'] * $p['profit_percent'] / 100);

        $final[] = [
            "product_code" => $p['id'],
            "name" => $p['name'],
            "image" => $p['image_url'] ?? '../assets/img/default.png',
            "selling_price" => $selling_price,
            "color" => $p['category_name'] ?? 'N/A'
        ];
    }

    echo json_encode([
        "status" => "success",
        "data" => $final
    ]);

} catch (Exception $e) {

    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}