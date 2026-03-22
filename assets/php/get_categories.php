<?php
require "db.php";

try {
    // Lấy tất cả category
    $stmt = $pdo->query("SELECT * FROM categories ORDER BY id DESC");
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $result = [];

    foreach ($categories as $cat) {
        $category_id = $cat['id'];

        // Lấy attributes cho category này
        $stmt2 = $pdo->prepare("SELECT * FROM category_attributes WHERE category_id = ?");
        $stmt2->execute([$category_id]);
        $attributes = $stmt2->fetchAll(PDO::FETCH_ASSOC);

        // Lấy option nếu là select
        foreach ($attributes as &$attr) {
            if ($attr['type'] === 'select') {
                $stmt3 = $pdo->prepare("SELECT value FROM attribute_options WHERE attribute_id = ?");
                $stmt3->execute([$attr['id']]);
                $options = $stmt3->fetchAll(PDO::FETCH_COLUMN);
                $attr['options'] = $options;
            }
        }

        $cat['attributes'] = $attributes;
        $result[] = $cat;
    }

    echo json_encode(['status' => 'success', 'data' => $result]);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>