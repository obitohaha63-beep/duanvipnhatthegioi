<?php
session_start();
header('Content-Type: application/json');

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['email']) || !isset($data['password'])) {
    echo json_encode(["success" => false]);
    exit;
}

$email = trim($data['email']);
$password = trim($data['password']);

$sql = "SELECT id, name, email, password, role, status
        FROM users
        WHERE email = ?
        LIMIT 1";

$stmt = $conn->prepare($sql);
$stmt->execute([$email]);

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {

    if ($user['role'] !== 'admin') {
        echo json_encode([
            "success" => false,
            "message" => "Không có quyền admin"
        ]);
        exit;
    }

    if ($user['status'] === 'locked') {
        echo json_encode([
            "success" => false,
            "message" => "Tài khoản bị khóa"
        ]);
        exit;
    }

    if (password_verify($password, $user['password'])) {

        $_SESSION['admin_id'] = $user['id'];
        $_SESSION['admin_name'] = $user['name'];

        echo json_encode([
            "success" => true
        ]);

    } else {
        echo json_encode([
            "success" => false,
            "message" => "Sai mật khẩu"
        ]);
    }

} else {
    echo json_encode([
        "success" => false,
        "message" => "Email không tồn tại"
    ]);
}
?>