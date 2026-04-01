<?php
session_start();
header('Content-Type: application/json');
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$cart_id = $data['cart_id'];

$sql = "DELETE FROM cart WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$cart_id]);

echo json_encode(["success" => true]);