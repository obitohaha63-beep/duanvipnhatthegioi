<?php
session_start();
header('Content-Type: application/json; charset=utf-8');

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['email']) || !isset($data['password'])) {
    echo json_encode([
        "success" => false,
        "message" => "Thiếu dữ liệu"
    ]);
    exit;
}

$email = trim($data['email']);
$password = trim($data['password']);

try {
    $sql = "SELECT id, name, email, password, role, status
            FROM users
            WHERE email = ?
            LIMIT 1";

    $stmt = $conn->prepare($sql);
    $stmt->execute([$email]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode([
            "success" => false,
            "message" => "Email không tồn tại"
        ]);
        exit;
    }

    // 🔒 Check admin nếu login từ admin page
    if (isset($data['type']) && $data['type'] === 'admin') {
        if ($user['role'] !== 'admin') {
            echo json_encode([
                "success" => false,
                "message" => "Không phải tài khoản admin"
            ]);
            exit;
        }
    }

    // Check trạng thái
    if ($user['status'] === 'locked') {
        echo json_encode([
            "success" => false,
            "message" => "Tài khoản bị khóa"
        ]);
        exit;
    }

    // Check password
    if (!password_verify($password, $user['password'])) {
        echo json_encode([
            "success" => false,
            "message" => "Sai mật khẩu"
        ]);
        exit;
    }

    // Lưu session chung
    $_SESSION['user'] = [
        "id" => $user['id'],
        "name" => $user['name'],
        "role" => $user['role']
    ];

    echo json_encode([
        "success" => true,
        "user" => $_SESSION['user']
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Lỗi server"
    ]);
}
?>