<?php
session_start();
include 'db.php';

$user_id = $_SESSION['user_id'];

$name = $_POST['name'];
$phone = $_POST['phone'];

$city = $_POST['city'];
$district = $_POST['district'];
$ward = $_POST['ward'];
$detail_address = $_POST['detail_address'];

// update users
$stmt = $conn->prepare("UPDATE users SET name = ?, phone = ? WHERE id = ?");
$stmt->execute([$name, $phone, $user_id]);

// check address
$check = $conn->prepare("SELECT id FROM user_address WHERE user_id = ? AND is_default = 1");
$check->execute([$user_id]);

if ($check->rowCount() > 0) {
    $stmt2 = $conn->prepare("
        UPDATE user_address 
        SET city=?, district=?, ward=?, detail_address=? 
        WHERE user_id=? AND is_default=1
    ");
    $stmt2->execute([$city, $district, $ward, $detail_address, $user_id]);
} else {
    $stmt2 = $conn->prepare("
        INSERT INTO user_address(user_id, city, district, ward, detail_address, is_default)
        VALUES (?, ?, ?, ?, ?, 1)
    ");
    $stmt2->execute([$user_id, $city, $district, $ward, $detail_address]);
}

header("Location: ../../pages/taikhoan.php");
exit;
?>