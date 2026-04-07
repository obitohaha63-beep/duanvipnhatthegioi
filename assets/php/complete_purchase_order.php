<?php
header('Content-Type: application/json; charset=utf-8');
include __DIR__ . '/db.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? null;
$order_date = $data['order_date'] ?? null;
$items = $data['items'] ?? [];

if (!$id || !$order_date || empty($items)) {
    echo json_encode([
        "success" => false,
        "message" => "Dữ liệu không hợp lệ"
    ]);
    exit;
}

try {
    $conn->beginTransaction();

    
    $check = $conn->prepare("
        SELECT status
        FROM purchase_orders
        WHERE id = ?
    ");
    $check->execute([$id]);

    $status = $check->fetchColumn();

    if ($status === 'completed') {
        throw new Exception("Phiếu nhập đã hoàn tất trước đó");
    }

    foreach ($items as $item) {

        $productId = $item['product_id'];
        $qty = $item['quantity'];
        $price = $item['import_price'];

        
        $countStmt = $conn->prepare("
            SELECT COUNT(*)
            FROM purchase_order_items poi
            JOIN purchase_orders po ON poi.purchase_order_id = po.id
            WHERE poi.product_id = ?
            AND po.status = 'completed'
        ");
        $countStmt->execute([$productId]);

        $importTimes = $countStmt->fetchColumn() + 1;

        
        $stmtItem = $conn->prepare("
            UPDATE purchase_order_items
            SET quantity = ?, import_price = ?, number_import_times = ?
            WHERE purchase_order_id = ? AND product_id = ?
        ");

        $stmtItem->execute([
            $qty,
            $price,
            $importTimes,
            $id,
            $productId
        ]);

        
        $stmtOld = $conn->prepare("
            SELECT quantity, cost_price
            FROM products
            WHERE id = ?
        ");
        $stmtOld->execute([$productId]);

        $old = $stmtOld->fetch(PDO::FETCH_ASSOC);

        $oldQty = (float)$old['quantity'];
        $oldCost = (float)$old['cost_price'];

        $newCost = ($oldQty + $qty) > 0
            ? (($oldQty * $oldCost) + ($qty * $price)) / ($oldQty + $qty)
            : $price;

        $stmtProduct = $conn->prepare("
            UPDATE products
            SET quantity = quantity + ?, cost_price = ?
            WHERE id = ?
        ");

        $stmtProduct->execute([
            $qty,
            $newCost,
            $productId
        ]);
    }

    
    $stmt = $conn->prepare("
        UPDATE purchase_orders
        SET order_date = ?, status = 'completed'
        WHERE id = ?
    ");

    $stmt->execute([$order_date, $id]);

    $conn->commit();

    echo json_encode([
        "success" => true,
        "message" => "Hoàn tất phiếu nhập thành công"
    ]);

} catch (Exception $e) {

    $conn->rollBack();

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>