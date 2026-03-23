<?php
header('Content-Type: application/json');
require 'db.php';

try {
    $conn->beginTransaction();

    // ===== DATA =====
    $name = $_POST['name'];
    $category_id = $_POST['category_id'];
    $cost_price = $_POST['cost_price'];
    $profit_percent = $_POST['profit_percent'];
    $description = $_POST['description'];
    $quantity = $_POST['quantity'];
    $attributes = json_decode($_POST['attributes'], true);

    // ===== INSERT PRODUCT =====
    $stmt = $conn->prepare("
        INSERT INTO products (category_id, name, description, cost_price, profit_percent)
        VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->execute([$category_id, $name, $description, $cost_price, $profit_percent]);
    $product_id = $conn->lastInsertId();

    // ===== INSERT VARIANT =====
    $sku = 'SKU-' . time();
    $stmt = $conn->prepare("
        INSERT INTO product_variants (product_id, sku, quantity)
        VALUES (?, ?, ?)
    ");
    $stmt->execute([$product_id, $sku, $quantity]);
    $variant_id = $conn->lastInsertId();

    // ===== INSERT ATTRIBUTES =====
    foreach ($attributes as $attr) {
        $attribute_id = $attr['attribute_id'];
        $value = $attr['value'];

        // Lấy type của attribute
        $stmt = $conn->prepare("SELECT type FROM attributes WHERE id = ?");
        $stmt->execute([$attribute_id]);
        $type = $stmt->fetchColumn();

        if ($type === 'select') {
            if (empty($value)) {
                throw new Exception("Attribute select không được để trống");
            }

            // Kiểm tra option đã tồn tại chưa
            $stmt = $conn->prepare("
                SELECT id FROM attribute_options 
                WHERE attribute_id = ? AND value = ?
            ");
            $stmt->execute([$attribute_id, $value]);
            $option_id = $stmt->fetchColumn();

            if (!$option_id) {
                $stmt = $conn->prepare("
                    INSERT INTO attribute_options (attribute_id, value)
                    VALUES (?, ?)
                ");
                $stmt->execute([$attribute_id, $value]);
                $option_id = $conn->lastInsertId();
            }

            $value_text = null;

        } else {
            // TEXT → lưu text
            $option_id = null;
            $value_text = $value;
        }

        // Insert vào variant_attributes
        $stmt = $conn->prepare("
            INSERT INTO variant_attributes (variant_id, attribute_id, option_id, value_text)
            VALUES (?, ?, ?, ?)
        ");
        $stmt->execute([$variant_id, $attribute_id, $option_id, $value_text]);
    }

    $conn->commit();

    echo json_encode([
        "status" => "success",
        "message" => "Thêm sản phẩm thành công"
    ]);

} catch (Exception $e) {
    $conn->rollBack();
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}