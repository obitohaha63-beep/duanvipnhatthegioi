<?php
header('Content-Type: application/json');
require 'db.php';

if (!isset($_GET['id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing product id"
    ]);
    exit;
}

$product_id = $_GET['id'];

try {

    // 1. Product
    $stmt = $conn->prepare("
        SELECT * FROM products WHERE id = ?
    ");
    $stmt->execute([$product_id]);
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$product) {
        echo json_encode([
            "status" => "error",
            "message" => "Product not found"
        ]);
        exit;
    }

    // 2. Images
    $stmt = $conn->prepare("
        SELECT image_url FROM product_images WHERE product_id = ?
    ");
    $stmt->execute([$product_id]);
    $images = $stmt->fetchAll(PDO::FETCH_COLUMN);

    // 3. Variants
    $stmt = $conn->prepare("
        SELECT * FROM product_variants WHERE product_id = ?
    ");
    $stmt->execute([$product_id]);
    $variants = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 4. Attributes per variant
    foreach ($variants as &$variant) {

        $stmt = $conn->prepare("
            SELECT 
                a.name,
                COALESCE(ao.value, va.value_text) AS value
            FROM variant_attributes va
            JOIN attributes a ON va.attribute_id = a.id
            LEFT JOIN attribute_options ao ON va.option_id = ao.id
            WHERE va.variant_id = ?
        ");
        $stmt->execute([$variant['id']]);

        $variant['attributes'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    echo json_encode([
        "status" => "success",
        "data" => [
            "product" => $product,
            "images" => $images,
            "variants" => $variants
        ]
    ]);

} catch (Exception $e) {

    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}