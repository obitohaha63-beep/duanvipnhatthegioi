<?php
session_start();

// Lưu lại role trước khi xóa session
$role = $_SESSION['user']['role'] ?? null;

// Xóa session
session_unset();
session_destroy();

// Điều hướng theo role
if ($role === 'admin') {
    header("Location: ../../pages/admindangnhap.php");
} else {
    header("Location: ../../pages/login.html");
}

exit;
?>