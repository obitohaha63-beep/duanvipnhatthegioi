<?php
header("Content-Type: application/json");
require "db.php";

$keyword = trim($_GET['keyword'] ?? '');

if (empty($keyword)) {
    echo json_encode([]);
    exit;
}

try {
    // Truy vấn để lấy danh sách tên sản phẩm theo từ khóa
    $sql = "SELECT DISTINCT p.name 
            FROM products p
            WHERE p.name LIKE :keyword 
            AND p.status = 'visible'
            LIMIT 10";
    
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(':keyword', "%$keyword%");
    $stmt->execute();
    
    $products = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $products[] = [
            "name" => $row["name"]
        ];
    }
    
    echo json_encode($products);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
