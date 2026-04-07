<?php
header('Content-Type: application/json; charset=utf-8');
include __DIR__ . '/db.php';

$data = json_decode(file_get_contents("php://input"), true);

$orderDate = $data['order_date'] ?? null;
$items = $data['items'] ?? [];

if (!$orderDate || empty($items)) {
    echo json_encode([
        "success" => false,
        "message" => "Thiếu dữ liệu"
    ]);
    exit;
}

try {
    $conn->beginTransaction();

    
    $stmt = $conn->prepare("INSERT INTO purchase_orders (order_date) VALUES (?)");
    $stmt->execute([$orderDate]);
    $orderId = $conn->lastInsertId();

    foreach ($items as $item) {
        
        $stmt = $conn->prepare("SELECT id, quantity, cost_price, number_import_times FROM products WHERE name = ? AND category = ?");
        $stmt->execute([$item['product_name'], $item['category']]);
        $product = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$product) {
            throw new Exception("Sản phẩm không tồn tại: " . $item['product_name']);
        }

        $productId = $product['id'];
        $oldStock = (float)$product['quantity'];
        $oldCost = (float)$product['cost_price'];
        $qty = (float)$item['quantity'];
        $price = (float)$item['import_price'];

        
        $newCost = ($oldStock * $oldCost + $qty * $price) / ($oldStock + $qty);
        $newStock = $oldStock + $qty;

        
        $updateProduct = $conn->prepare("
            UPDATE products
            SET quantity = ?, cost_price = ?, number_import_times = number_import_times + 1
            WHERE id = ?
        ");
        $updateProduct->execute([$newStock, $newCost, $productId]);

        
        $insertItem = $conn->prepare("
            INSERT INTO purchase_order_items (purchase_order_id, product_id, quantity, import_price)
            VALUES (?, ?, ?, ?)
        ");
        $insertItem->execute([$orderId, $productId, $qty, $price]);
    }

    $conn->commit();

    echo json_encode([
        "success" => true,
        "message" => "Tạo phiếu nhập thành công"
    ]);

} catch (Exception $e) {
    $conn->rollBack();
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>