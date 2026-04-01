<?php
session_start();

if (!isset($_SESSION['user'])) {
    header("Location: ../pages/admindangnhap.php");
    exit;
}

if ($_SESSION['user']['role'] !== 'admin') {
    echo "Bạn không có quyền truy cập!";
    exit;
}
?>