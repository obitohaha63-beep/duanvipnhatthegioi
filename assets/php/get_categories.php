<?php
header("Content-Type: application/json");
require "db.php";

try {
    $stmt = $conn->prepare("SELECT id, name FROM categories ORDER BY name ASC");
    $stmt->execute();
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'data' => $categories
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Lỗi DB: ' . $e->getMessage()
    ]);
}
?>