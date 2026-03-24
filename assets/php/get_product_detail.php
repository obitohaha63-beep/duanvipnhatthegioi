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
    $stmt = $conn->prepare("SELECT * FROM products WHERE id = ?");
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
    $stmt = $conn->prepare("SELECT id, image_url FROM product_images WHERE product_id = ?");
    $stmt->execute([$product_id]);
    $images = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 3. Variants
    $stmt = $conn->prepare("SELECT * FROM product_variants WHERE product_id = ?");
    $stmt->execute([$product_id]);
    $variants = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 4. Attributes per variant
    foreach ($variants as &$variant) {
        $stmt = $conn->prepare("
            SELECT 
                a.id AS attribute_id,
                a.name,
                a.type,
                va.option_id,
                va.value_text,
                ao.value AS option_value
            FROM variant_attributes va
            JOIN attributes a ON va.attribute_id = a.id
            LEFT JOIN attribute_options ao ON va.option_id = ao.id
            WHERE va.variant_id = ?
        ");
        $stmt->execute([$variant['id']]);
        $variant['attributes'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // 5. All attributes of this category (for dynamic form)
    $stmt = $conn->prepare("SELECT * FROM attributes WHERE category_id = ?");
    $stmt->execute([$product['category_id']]);
    $attributes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($attributes as &$attr) {
        if ($attr['type'] === 'select') {
            $stmt = $conn->prepare("SELECT id, value FROM attribute_options WHERE attribute_id = ?");
            $stmt->execute([$attr['id']]);
            $attr['options'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }

    echo json_encode([
        "status" => "success",
        "data" => [
            "product" => $product,
            "images" => $images,
            "variants" => $variants,
            "attributes" => $attributes
        ]
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}