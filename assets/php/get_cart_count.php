<?php
session_start();
header('Content-Type: application/json');
require "db.php";

if (!isset($_SESSION['user'])) {
    echo json_encode([
        "success" => false,
        "count" => 0
    ]);
    exit;
}

$user_id = $_SESSION['user']['id'];

$sql = "SELECT SUM(quantity) as total FROM cart WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$user_id]);

$result = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode([
    "success" => true,
    "count" => (int)($result['total'] ?? 0)
]);