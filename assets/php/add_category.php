<?php
header("Content-Type: application/json");
require_once "db.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $description = trim($_POST['description'] ?? '');

    if ($name === '') {
        echo json_encode(['success' => false, 'message' => 'Tên loại sản phẩm không được để trống']);
        exit;
    }

    try {
        $stmt = $conn->prepare("INSERT INTO categories (name) VALUES (:name)");
        $stmt->bindParam(':name', $name);
        $stmt->execute();

        echo json_encode(['success' => true, 'message' => 'Thêm loại sản phẩm thành công']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Lỗi DB: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Phương thức không hợp lệ']);
}