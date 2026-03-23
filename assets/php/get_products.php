<?php
header('Content-Type: application/json');
require 'db.php';

try {
    // Lấy sản phẩm cơ bản
    $stmt = $conn->prepare("
        SELECT 
            p.id,
            p.name,
            p.cost_price,
            p.profit_percent,
            p.status,
            c.name AS category_name,
            pi.image_url
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN product_images pi ON pi.product_id = p.id
        GROUP BY p.id
        ORDER BY p.id DESC
    ");
    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $finalProducts = [];

    foreach ($products as $p) {
        // Lấy variant
        $stmtVar = $conn->prepare("SELECT id, sku, quantity FROM product_variants WHERE product_id = ?");
        $stmtVar->execute([$p['id']]);
        $variants = $stmtVar->fetchAll(PDO::FETCH_ASSOC);

        // Lấy attributes cho mỗi variant
        foreach ($variants as &$v) {
            $stmtAttr = $conn->prepare("
                SELECT a.name AS attr_name, ao.value AS option_value, va.value_text
                FROM variant_attributes va
                LEFT JOIN attributes a ON va.attribute_id = a.id
                LEFT JOIN attribute_options ao ON va.option_id = ao.id
                WHERE va.variant_id = ?
            ");
            $stmtAttr->execute([$v['id']]);
            $v['attributes'] = $stmtAttr->fetchAll(PDO::FETCH_ASSOC);
        }

        $p['variants'] = $variants;
        $finalProducts[] = $p;
    }

    echo json_encode([
        "status" => "success",
        "data" => $finalProducts
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}