<?php
header('Content-Type: application/json');
require 'db.php';

$category_id = $_GET['category_id'];

$stmt = $conn->prepare("
    SELECT * FROM attributes WHERE category_id = ?
");
$stmt->execute([$category_id]);
$attributes = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($attributes as &$attr) {

    if ($attr['type'] === 'select') {
        $stmt = $conn->prepare("
            SELECT id, value FROM attribute_options WHERE attribute_id = ?
        ");
        $stmt->execute([$attr['id']]);
        $attr['options'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

echo json_encode([
    "status" => "success",
    "data" => $attributes
]);