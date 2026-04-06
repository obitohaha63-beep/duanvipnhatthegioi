<?php
header('Content-Type: application/json');
include 'db.php'; // Kết nối tới database quebshop2

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Dữ liệu không hợp lệ"]);
    exit;
}

$name = $data['name'];
$email = $data['email'];
$phone = $data['phone'];
$role = $data['role'];
// Mã hóa mật khẩu '123456' bằng bcrypt như database hiện tại của em
$hashed_password = password_hash($data['password'], PASSWORD_BCRYPT);

try {
    // Kiểm tra email tồn tại chưa
    $checkEmail = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $checkEmail->execute([$email]);
    if ($checkEmail->rowCount() > 0) {
        echo json_encode(["success" => false, "message" => "Email này đã được sử dụng!"]);
        exit;
    }

    $sql = "INSERT INTO users (name, email, phone, role, password, status) VALUES (?, ?, ?, ?, ?, 'active')";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$name, $email, $phone, $role, $hashed_password]);

    echo json_encode(["success" => true]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Lỗi: " . $e->getMessage()]);
}
?>