<?php
header('Content-Type: application/json');
require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'];
$description = $data['description'];
$attributes = $data['attributes'];

try {
    $conn->beginTransaction();

    // 1. Insert category
    $stmt = $conn->prepare("INSERT INTO categories (name, description) VALUES (?, ?)");
    $stmt->execute([$name, $description]);

    $category_id = $conn->lastInsertId();

    // 2. Insert attributes
    foreach ($attributes as $attr) {

        $stmt = $conn->prepare("
            INSERT INTO attributes (category_id, name, type)
            VALUES (?, ?, ?)
        ");
        $stmt->execute([$category_id, $attr['name'], $attr['type']]);

        $attribute_id = $conn->lastInsertId();

        // 3. Insert options nếu là select
        if ($attr['type'] === 'select' && !empty($attr['options'])) {

            foreach ($attr['options'] as $option) {
                $stmt = $conn->prepare("
                    INSERT INTO attribute_options (attribute_id, value)
                    VALUES (?, ?)
                ");
                $stmt->execute([$attribute_id, $option]);
            }
        }
    }

    $conn->commit();

    echo json_encode([
        "status" => "success",
        "message" => "Tạo loại sản phẩm thành công"
    ]);

} catch (Exception $e) {

    $conn->rollBack();

    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}