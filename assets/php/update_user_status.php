<?php
header('Content-Type: application/json; charset=utf-8');

include __DIR__ . '/db.php';

try {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data || !isset($data['userId']) || !isset($data['newStatus'])) {
        echo json_encode([
            "success" => false,
            "message" => "Thiếu dữ liệu"
        ]);
        exit;
    }

    $userId = intval($data['userId']);
    $newStatus = $data['newStatus'];

    $sql = "UPDATE users SET status = :status WHERE id = :id";
    $stmt = $conn->prepare($sql);

    $stmt->bindValue(':status', $newStatus, PDO::PARAM_STR);
    $stmt->bindValue(':id', $userId, PDO::PARAM_INT);

    $stmt->execute();

    echo json_encode([
        "success" => true,
        "message" => "Cập nhật trạng thái thành công"
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Lỗi SQL: " . $e->getMessage()
    ]);
}
?>