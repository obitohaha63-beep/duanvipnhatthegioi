<?php
header('Content-Type: application/json; charset=utf-8');

$response = ['success' => false, 'message' => ''];

try {
    include __DIR__ . '/db.php';

    $input = json_decode(file_get_contents("php://input"), true);
    $supplier = $input['supplier'] ?? '';
    $items = $input['items'] ?? [];

    if (!$supplier || !count($items)) {
        throw new Exception("Dữ liệu phiếu nhập không hợp lệ!");
    }

    // Insert phiếu nhập
    $stmt = $conn->prepare("INSERT INTO purchase_orders (supplier_name) VALUES (?)");
    $stmt->execute([$supplier]);
    $purchaseOrderId = $conn->lastInsertId();

    // Insert chi tiết phiếu nhập
    $stmtItem = $conn->prepare("INSERT INTO purchase_order_items (purchase_order_id, product_id, quantity, import_price) VALUES (?,?,?,?)");

    foreach ($items as $item) {
        $stmtItem->execute([
            $purchaseOrderId,
            $item['product_id'],
            $item['quantity'],
            $item['import_price']
        ]);
    }

    $response['success'] = true;
    $response['message'] = 'Tạo phiếu nhập thành công!';
} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
exit;
?>