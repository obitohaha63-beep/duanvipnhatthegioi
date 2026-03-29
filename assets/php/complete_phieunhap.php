<?php
header('Content-Type: application/json; charset=utf-8');
$response = ['success' => false, 'message' => ''];

try {
    include __DIR__ . '/db.php'; // giữ kết nối hiện tại

    $input = json_decode(file_get_contents("php://input"), true);
    $ngayNhap = $input['ngay_nhap'] ?? '';
    $products = $input['products'] ?? [];

    if (!$ngayNhap || !count($products)) {
        throw new Exception("Dữ liệu phiếu nhập không hợp lệ!");
    }

    // 1. Thêm phiếu nhập hàng
    $stmt = $conn->prepare("INSERT INTO purchase_orders (order_date) VALUES (?)");
    $stmt->execute([$ngayNhap]);
    $purchaseOrderId = $conn->lastInsertId();

    // 2. Thêm chi tiết phiếu nhập hàng
    $stmtItem = $conn->prepare("INSERT INTO purchase_order_items (purchase_order_id, product_id, quantity, import_price) VALUES (?, ?, ?, ?)");
    foreach ($products as $p) {
        $stmtItem->execute([
            $purchaseOrderId,
            $p['product_id'],
            $p['quantity'],
            $p['price']
        ]);
    }

    $response['success'] = true;
    $response['inserted'] = count($products);
    $response['message'] = "Tạo phiếu nhập thành công!";

} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
exit;
?>