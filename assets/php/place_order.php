<?php
session_start();
header('Content-Type: application/json');
require 'db.php';

if (!isset($_SESSION['user'])) {
    echo json_encode(['success' => false, 'message' => 'Bạn chưa đăng nhập']);
    exit;
}

$user_id = $_SESSION['user']['id'];
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['address'], $data['payment_method'])) {
    echo json_encode(['success' => false, 'message' => 'Thiếu thông tin đặt hàng']);
    exit;
}

$address = trim($data['address']);
$payment_method = $data['payment_method'];

try {
    
    $conn->beginTransaction();

    
    $stmt = $conn->prepare("SELECT c.product_id, c.quantity, p.cost_price, p.profit_rate 
                            FROM cart c JOIN products p ON c.product_id = p.id 
                            WHERE c.user_id = ?");
    $stmt->execute([$user_id]);
    $cartItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!$cartItems) {
        echo json_encode(['success' => false, 'message' => 'Giỏ hàng trống']);
        exit;
    }

    
    $total = 0;
    foreach ($cartItems as $item) {
        $selling_price = $item['cost_price'] * (1 + $item['profit_rate']/100);
        $total += $selling_price * $item['quantity'];
    }

    
    $stmt = $conn->prepare("INSERT INTO orders (user_id, delivery_address, payment_method, total_amount) VALUES (?, ?, ?, ?)");
    $stmt->execute([$user_id, $address, $payment_method, $total]);
    $order_id = $conn->lastInsertId(); 

    
    $stmtInsertItem = $conn->prepare("INSERT INTO order_items (order_id, product_id, quantity, selling_price) VALUES (?, ?, ?, ?)");
    foreach ($cartItems as $item) {
        $selling_price = $item['cost_price'] * (1 + $item['profit_rate']/100);
        $stmtInsertItem->execute([$order_id, $item['product_id'], $item['quantity'], $selling_price]);
    }

    
    $stmt = $conn->prepare("DELETE FROM cart WHERE user_id = ?");
    $stmt->execute([$user_id]);

    
    $conn->commit();

    echo json_encode(['success' => true, 'order_id' => $order_id]);

} catch (Exception $e) {
    
    $conn->rollBack();
    echo json_encode(['success' => false, 'message' => 'Đặt hàng thất bại: '.$e->getMessage()]);
}
?>