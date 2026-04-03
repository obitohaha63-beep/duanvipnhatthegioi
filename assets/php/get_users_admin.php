<?php
header('Content-Type: application/json; charset=utf-8');
require "db.php";

try {
    $stmt = $conn->prepare("
        SELECT id, name, email, role, status
        FROM users
    ");
    $stmt->execute();

    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($users);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Lỗi server",
        "error" => $e->getMessage()
    ]);
}