<?php
session_start();
header('Content-Type: application/json');
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$cart_id = $data['cart_id'];
$quantity = $data['quantity'];

$sql = "UPDATE cart SET quantity = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$quantity, $cart_id]);

echo json_encode(["success" => true]);