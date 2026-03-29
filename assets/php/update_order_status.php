<?php
header('Content-Type: application/json; charset=utf-8');
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? null;
$newStatus = $data['status'] ?? null;

if (!$id || !$newStatus) {
    echo json_encode([
        "success" => false,
        "message" => "Thiếu dữ liệu"
    ]);
    exit;
}

try {
    $conn->beginTransaction();

    // Lấy trạng thái cũ
    $stmt = $conn->prepare("SELECT status FROM orders WHERE id = ?");
    $stmt->execute([$id]);
    $order = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$order) {
        throw new Exception("Không tìm thấy đơn hàng");
    }

    $oldStatus = $order['status'];

    // Chỉ trừ kho khi pending -> confirmed hoặc delivered
    if (
        $oldStatus === 'pending' &&
        ($newStatus === 'confirmed' || $newStatus === 'delivered')
    ) {

        // Lấy danh sách sản phẩm
        $stmtItems = $conn->prepare("
            SELECT product_id, quantity
            FROM order_items
            WHERE order_id = ?
        ");
        $stmtItems->execute([$id]);
        $items = $stmtItems->fetchAll(PDO::FETCH_ASSOC);

        foreach ($items as $item) {

            // kiểm tra tồn kho hiện tại
            $stmtCheck = $conn->prepare("
                SELECT quantity
                FROM products
                WHERE id = ?
            ");
            $stmtCheck->execute([$item['product_id']]);
            $product = $stmtCheck->fetch(PDO::FETCH_ASSOC);

            if (!$product) {
                throw new Exception("Không tìm thấy sản phẩm");
            }

            if ($product['quantity'] < $item['quantity']) {
                throw new Exception("Sản phẩm ID {$item['product_id']} không đủ tồn kho");
            }

            // trừ kho
            $stmtUpdateStock = $conn->prepare("
                UPDATE products
                SET quantity = quantity - ?
                WHERE id = ?
            ");
            $stmtUpdateStock->execute([
                $item['quantity'],
                $item['product_id']
            ]);
        }
    }

    // update trạng thái đơn
    $stmtUpdate = $conn->prepare("
        UPDATE orders
        SET status = ?
        WHERE id = ?
    ");
    $stmtUpdate->execute([$newStatus, $id]);

    $conn->commit();

    echo json_encode([
        "success" => true,
        "message" => "Cập nhật trạng thái thành công"
    ]);

} catch (Exception $e) {

    $conn->rollBack();

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>