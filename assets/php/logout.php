<?php
session_start();


$role = $_SESSION['user']['role'] ?? null;


session_unset();
session_destroy();


if ($role === 'admin') {
    header("Location: ../../pages/admindangnhap.php");
} else {
    header("Location: ../../pages/login.html");
}

exit;
?>