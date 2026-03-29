<?php
header('Content-Type: application/json; charset=utf-8');
$response = ['success' => false, 'message' => ''];

try {
    include __DIR__ . '/db.php';
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Lấy dữ liệu JSON từ JS
    $input = json_decode(file_get_contents("php://input"), true);
    if (!$input) throw new Exception("Không nhận được dữ liệu JSON!");

    $orderId = $input['id'] ?? '';
    $orderDate = $input['order_date'] ?? '';
    $items = $input['items'] ?? [];

    if (!$orderId || !$orderDate || !count($items)) {
        throw new Exception("Dữ liệu phiếu nhập không hợp lệ!");
    }

    // 1. Cập nhật phiếu nhập
    $stmt = $conn->prepare("UPDATE purchase_orders SET order_date = ?, status = 'completed' WHERE id = ?");
    $stmt->execute([$orderDate, $orderId]);

    // 2. Chuẩn bị các câu lệnh SQL
    $stmtItem = $conn->prepare("UPDATE purchase_order_items SET quantity = ?, import_price = ? WHERE purchase_order_id = ? AND product_id = ?");
    $stmtProduct = $conn->prepare("SELECT quantity, cost_price FROM products WHERE id = ?");
    $stmtUpdateProduct = $conn->prepare("UPDATE products 
        SET cost_price = ?, quantity = quantity + ?, number_import_times = number_import_times + 1 
        WHERE id = ?");

    // 3. Duyệt từng item
    foreach ($items as $item) {
        if (!isset($item['product_id'], $item['quantity'], $item['import_price'])) {
            throw new Exception("Thiếu thông tin sản phẩm trong items!");
        }

        $productId = (int)$item['product_id'];
        $qtyNew = (float)$item['quantity'];
        $importPrice = (float)$item['import_price'];

        // Cập nhật chi tiết phiếu nhập
        $stmtItem->execute([$qtyNew, $importPrice, $orderId, $productId]);

        // Lấy thông tin sản phẩm hiện tại
        $stmtProduct->execute([$productId]);
        $product = $stmtProduct->fetch(PDO::FETCH_ASSOC);
        if (!$product) throw new Exception("Sản phẩm ID $productId không tồn tại!");

        $currentQty = (float)$product['quantity'];
        $currentCost = (float)$product['cost_price'];

        // Tính giá vốn mới
        $newCost = ($currentQty * $currentCost + $qtyNew * $importPrice) / ($currentQty + $qtyNew);

        // Cập nhật sản phẩm
        $stmtUpdateProduct->execute([$newCost, $qtyNew, $productId]);
    }

    $response['success'] = true;
    $response['message'] = "Hoàn tất phiếu nhập và cập nhật giá vốn thành công!";

} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = "Lỗi: " . $e->getMessage();
}

echo json_encode($response);
exit;