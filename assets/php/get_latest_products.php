<?php
/**
 * API: Lấy danh sách sản phẩm mới nhất
 * Trả về danh sách 4 sản phẩm mới nhất từ cơ sở dữ liệu
 * 
 * Response: JSON array chứa danh sách sản phẩm
 */

header('Content-Type: application/json; charset=utf-8');
include __DIR__ . '/db.php';

try {
    // Truy vấn 4 sản phẩm mới nhất (sắp xếp theo ID giảm dần)
    $sql = "
        SELECT 
            id, 
            name, 
            image_url, 
            cost_price, 
            profit_rate,
            ROUND(cost_price * (1 + profit_rate / 100)) AS selling_price
        FROM products 
        WHERE status = 'visible'
        ORDER BY id DESC 
        LIMIT 4
    ";
    
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Trả về dữ liệu JSON
    echo json_encode([
        'success' => true,
        'data' => $products
    ], JSON_UNESCAPED_UNICODE);
    
} catch(PDOException $e) {
    // Nếu có lỗi cơ sở dữ liệu
    echo json_encode([
        'success' => false,
        'error' => 'Lỗi lấy dữ liệu: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
