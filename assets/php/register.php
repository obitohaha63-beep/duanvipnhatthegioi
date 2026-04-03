<?php
header('Content-Type: application/json');
require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (
    !$data ||
    !isset($data['name'], $data['email'], $data['password'],
            $data['city'], $data['district'], $data['ward'], $data['detail_address'], $data['phone'])
) {
    echo json_encode(["success" => false, "message" => "Thiếu dữ liệu"]);
    exit;
}

$name = trim($data['name']);
$email = trim($data['email']);
$password = $data['password'];

$city = trim($data['city']);
$district = trim($data['district']);
$ward = trim($data['ward']);
$detail_address = trim($data['detail_address']);
$phone = trim($data['phone']);

try {
    // check email
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(["success" => false, "message" => "Email đã tồn tại"]);
        exit;
    }

    // hash password
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // transaction (RẤT QUAN TRỌNG)
    $conn->beginTransaction();

    // insert user
    $stmt = $conn->prepare("
        INSERT INTO users (name, email, password,phone)
        VALUES (?, ?, ?,?)
    ");
    $stmt->execute([$name, $email, $hashedPassword,$phone]);

    // lấy user_id vừa tạo
    $user_id = $conn->lastInsertId();

    // insert address
    $stmt = $conn->prepare("
        INSERT INTO user_address (user_id, city, district, ward, detail_address, is_default)
        VALUES (?, ?, ?, ?, ?, 1)
    ");
    $stmt->execute([$user_id, $city, $district, $ward, $detail_address]);

    $conn->commit();

    echo json_encode(["success" => true]);

} catch (Exception $e) {
    $conn->rollBack();
    echo json_encode([
        "success" => false,
        "message" => "Lỗi server"
    ]);
}