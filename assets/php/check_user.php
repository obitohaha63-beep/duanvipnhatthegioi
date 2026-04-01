<?php
session_start();

if (!isset($_SESSION['user'])) {
    header("Location: ../pages/login.html");
    exit;
}

if ($_SESSION['user']['role'] !== 'customer') {
    echo "Bạn không có quyền truy cập!";
    exit;
}
?>