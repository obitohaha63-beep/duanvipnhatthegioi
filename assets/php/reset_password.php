<?php
header('Content-Type: application/json; charset=utf-8');

include __DIR__ . '/db.php';

try {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data || !isset($data['userId'])) {
        echo json_encode([
            "success" => false,
            "message" => "Thiếu userId"
        ]);
        exit;
    }

    $userId = intval($data['userId']);
    $newPassword = password_hash("123456", PASSWORD_DEFAULT);

    $sql = "UPDATE users SET password = :password, is_reset = 1 WHERE id = :id";
    $stmt = $conn->prepare($sql);

    $stmt->bindValue(':password', $newPassword, PDO::PARAM_STR);
    $stmt->bindValue(':id', $userId, PDO::PARAM_INT);

    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            "success" => true,
            "message" => "Reset mật khẩu thành công"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Không tìm thấy user"
        ]);
    }

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Lỗi SQL: " . $e->getMessage()
    ]);
}
?>