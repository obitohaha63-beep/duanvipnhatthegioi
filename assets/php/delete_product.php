<?php
header('Content-Type: application/json');
require 'db.php';

$id = $_GET['id'];

try {

    $stmt = $conn->prepare("DELETE FROM products WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode([
        "status" => "success",
        "message" => "Đã xóa sản phẩm"
    ]);

} catch (Exception $e) {

    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}