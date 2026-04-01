<?php
session_start();
header('Content-Type: application/json');

require "db.php";

// ✅ check login
if (!isset($_SESSION['user'])) {
    echo json_encode([
        "success" => false,
        "message" => "Chưa đăng nhập"
    ]);
    exit;
}

// ✅ lấy đúng user_id
$user_id = $_SESSION['user']['id'];

try {

    $sql = "SELECT 
                c.id,
                c.product_id,
                c.quantity,
                c.color,
                c.size,
                p.name,
                p.image_url,
                (p.cost_price + (p.cost_price * p.profit_rate / 100)) AS price
            FROM cart c
            JOIN products p ON c.product_id = p.id
            WHERE c.user_id = :user_id";

    $stmt = $conn->prepare($sql);

    // ✅ BẮT BUỘC đúng kiểu này
    $stmt->execute([
        ":user_id" => $user_id
    ]);

    $cart = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "cart" => $cart
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Lỗi server",
        "error" => $e->getMessage()
    ]);
}
?>