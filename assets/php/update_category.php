<?php
header('Content-Type: application/json');
require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$name = $data['name'];
$description = $data['description'];

try {

    $stmt = $conn->prepare("
        UPDATE categories 
        SET name = ?, description = ?
        WHERE id = ?
    ");
    $stmt->execute([$name, $description, $id]);

    echo json_encode([
        "status" => "success",
        "message" => "Cập nhật thành công"
    ]);

} catch (Exception $e) {

    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}