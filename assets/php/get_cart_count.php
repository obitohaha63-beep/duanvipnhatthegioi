<?php
session_start();
header('Content-Type: application/json');
require "db.php";

if (!isset($_SESSION['user'])) {
    echo json_encode([
        "success" => true,
        "count" => 0
    ]);
    exit;
}

$user_id = $_SESSION['user']['id'];


$sql = "SELECT COUNT(*) as count FROM cart WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$user_id]);

$row = $stmt->fetch();

echo json_encode([
    "success" => true,
    "count" => (int)$row['count']
]);