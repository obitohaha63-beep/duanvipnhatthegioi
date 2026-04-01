<?php
session_start();

function checkRole($roleRequired) {

    if (!isset($_SESSION['user'])) {
        header("Location: ../pages/login.html");
        exit;
    }

    if ($_SESSION['user']['role'] !== $roleRequired) {
        echo "Bạn không có quyền truy cập!";
        exit;
    }
}