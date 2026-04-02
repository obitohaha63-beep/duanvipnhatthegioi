<?php
session_start();
header('Content-Type: application/json');

include 'db.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Chưa đăng nhập"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$address = $data['address'] ?? '';
$payment = $data['payment_method'] ?? 'cash';

$user_id = $_SESSION['user_id'];

try {
    $conn->beginTransaction();

    // 1. Lấy cart
    $stmt = $conn->prepare("
        SELECT c.*, p.cost_price, p.profit_rate
        FROM cart c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = ?
    ");
    $stmt->execute([$user_id]);
    $cart = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!$cart) {
        echo json_encode(["success" => false, "message" => "Giỏ hàng trống"]);
        exit;
    }

    // 2. Tính total
    $total = 0;
    foreach ($cart as $item) {
        $price = $item['cost_price'] * (1 + $item['profit_rate']/100);
        $total += $price * $item['quantity'];
    }

    // 3. Insert orders
    $stmt = $conn->prepare("
        INSERT INTO orders (user_id, delivery_address, payment_method, total_amount)
        VALUES (?, ?, ?, ?)
    ");
    $stmt->execute([$user_id, $address, $payment, $total]);

    $order_id = $conn->lastInsertId();

    // 4. Insert order_items
    $stmt = $conn->prepare("
        INSERT INTO order_items (order_id, product_id, quantity, selling_price)
        VALUES (?, ?, ?, ?)
    ");

    foreach ($cart as $item) {
        $price = $item['cost_price'] * (1 + $item['profit_rate']/100);

        $stmt->execute([
            $order_id,
            $item['product_id'],
            $item['quantity'],
            $price
        ]);
    }

    // 5. Xóa cart
    $stmt = $conn->prepare("DELETE FROM cart WHERE user_id = ?");
    $stmt->execute([$user_id]);

    $conn->commit();

    echo json_encode(["success" => true]);

} catch (Exception $e) {
    $conn->rollBack();
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}