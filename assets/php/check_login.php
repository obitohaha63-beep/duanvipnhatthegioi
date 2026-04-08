<?php
/**
 * API: Kiểm tra trạng thái đăng nhập
 * Trả về true nếu user đã đăng nhập, false nếu chưa
 */

session_start();
header('Content-Type: application/json; charset=utf-8');

$isLoggedIn = isset($_SESSION['user']);

echo json_encode([
    'isLoggedIn' => $isLoggedIn
]);
?>
