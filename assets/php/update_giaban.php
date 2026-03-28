<?php
header('Content-Type: application/json; charset=utf-8');
include __DIR__ . '/db.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? null;
$profit_rate = $data['profit_rate'] ?? null;

if (!$id || $profit_rate === null) {
    echo json_encode([
        "success" => false,
        "message" => "Thiếu dữ liệu"
    ]);
    exit;
}

try {
    $sql = "UPDATE products SET profit_rate = :profit_rate WHERE id = :id";
    $stmt = $conn->prepare($sql);

    $stmt->execute([
        ':profit_rate' => $profit_rate,
        ':id' => $id
    ]);

    echo json_encode([
        "success" => true
    ]);

} catch(PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>