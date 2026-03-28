<?php
header('Content-Type: application/json; charset=utf-8');

include __DIR__ . '/db.php';

try {
    $sql = "SELECT id, name, email, status, role FROM users";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($users);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Lỗi SQL: " . $e->getMessage()
    ]);
}
?>