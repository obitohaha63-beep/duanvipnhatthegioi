<?php
header('Content-Type: application/json');
try {
    $conn = new PDO("mysql:host=localhost;dbname=quebshop1;charset=utf8mb4", "root", "");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if (!isset($_GET['category_id'])) {
        echo json_encode([]);
        exit;
    }

    $category_id = $_GET['category_id'];

    $stmt = $conn->prepare("
        SELECT id, name 
        FROM products 
        WHERE category_id = :category_id
        AND status = 'visible'
    ");
    $stmt->execute(['category_id' => $category_id]);
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($products);

} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>