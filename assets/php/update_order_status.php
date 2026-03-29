<?php
header("Content-Type: application/json; charset=utf-8");
include __DIR__ . "/db.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"] ?? null;
$newStatus = $data["status"] ?? null;

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
    $stmtOld = $conn->prepare("
        SELECT status
        FROM orders
        WHERE id = ?
    ");
    $stmtOld->execute([$id]);
    $oldOrder = $stmtOld->fetch(PDO::FETCH_ASSOC);

    if (!$oldOrder) {
        throw new Exception("Không tìm thấy đơn hàng");
    }

    $oldStatus = $oldOrder["status"];

    // Update trạng thái đơn
    $stmt = $conn->prepare("
        UPDATE orders
        SET status = ?
        WHERE id = ?
    ");
    $stmt->execute([$newStatus, $id]);

    /*
    ==========================
    TRỪ KHO CHỈ 1 LẦN
    pending -> confirmed / delivered
    ==========================
    */
    if (
        $oldStatus === "pending" &&
        ($newStatus === "confirmed" || $newStatus === "delivered")
    ) {

        $stmtItems = $conn->prepare("
            SELECT product_id, quantity
            FROM order_items
            WHERE order_id = ?
        ");
        $stmtItems->execute([$id]);
        $items = $stmtItems->fetchAll(PDO::FETCH_ASSOC);

        foreach ($items as $item) {

            // Kiểm tra tồn kho
            $stmtCheck = $conn->prepare("
                SELECT quantity
                FROM products
                WHERE id = ?
            ");
            $stmtCheck->execute([$item["product_id"]]);
            $product = $stmtCheck->fetch(PDO::FETCH_ASSOC);

            if (!$product) {
                throw new Exception("Không tìm thấy sản phẩm ID {$item['product_id']}");
            }

            if ($product["quantity"] < $item["quantity"]) {
                throw new Exception("Sản phẩm ID {$item['product_id']} không đủ tồn kho");
            }

            // Trừ kho + cập nhật ngày gần nhất
            $stmtUpdateStock = $conn->prepare("
                UPDATE products
                SET quantity = quantity - ?,
                    last_update = NOW()
                WHERE id = ?
            ");

            $stmtUpdateStock->execute([
                $item["quantity"],
                $item["product_id"]
            ]);
        }
    }

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