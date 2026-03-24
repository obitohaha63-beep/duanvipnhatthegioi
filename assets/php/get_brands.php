<?php
header('Content-Type: application/json');
require 'db.php';

$stmt = $conn->prepare("SELECT id, name FROM brands ORDER BY name ASC");
$stmt->execute();
$brands = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    'status' => 'success',
    'data' => $brands
]);