<?php
header('Content-Type: application/json; charset=utf-8');
include 'db.php';

$category = $_GET['category'] ?? '';
$date = $_GET['date'] ?? '';

try {
    $dateTime = '';
    if ($date !== '') {
        $dateTime = $date . ' 23:59:59';
    }

    // 1. Lấy tất cả sản phẩm kèm tên danh mục
    $sql = "SELECT p.id, p.name, c.name AS category FROM products p
            LEFT JOIN categories c ON p.category_id = c.id WHERE 1=1";
    $params = [];
    if ($category !== '') {
        $sql .= " AND p.category_id = ?";
        $params[] = $category;
    }
    $stmt = $conn->prepare($sql);
    $stmt->execute($params);
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 2. Tổng số lượng nhập từ phiếu nhập completed
    $sqlImport = "SELECT poi.product_id, SUM(poi.quantity) AS total_imported
                  FROM purchase_order_items poi
                  JOIN purchase_orders po ON poi.purchase_order_id = po.id
                  WHERE po.status = 'completed'";
    $paramsImport = [];
    if ($dateTime !== '') {
        $sqlImport .= " AND po.order_date <= ?";
        $paramsImport[] = $dateTime;
    }
    $sqlImport .= " GROUP BY poi.product_id";
    $stmtImport = $conn->prepare($sqlImport);
    $stmtImport->execute($paramsImport);
    $importedData = $stmtImport->fetchAll(PDO::FETCH_ASSOC);
    $importMap = [];
    foreach ($importedData as $imp) {
        $importMap[$imp['product_id']] = (int)$imp['total_imported'];
    }

    // 3. Tổng số lượng xuất từ đơn hàng confirmed (bỏ canceled/pending)
    $sqlExport = "SELECT oi.product_id, SUM(oi.quantity) AS total_exported
                  FROM order_items oi
                  JOIN orders o ON oi.order_id = o.id
                  WHERE o.status = 'confirmed'";
    $paramsExport = [];
    if ($dateTime !== '') {
        $sqlExport .= " AND o.order_date <= ?";
        $paramsExport[] = $dateTime;
    }
    $sqlExport .= " GROUP BY oi.product_id";
    $stmtExport = $conn->prepare($sqlExport);
    $stmtExport->execute($paramsExport);
    $exportedData = $stmtExport->fetchAll(PDO::FETCH_ASSOC);
    $exportMap = [];
    foreach ($exportedData as $exp) {
        $exportMap[$exp['product_id']] = (int)$exp['total_exported'];
    }

    // 4. Tính tồn kho
    foreach ($products as &$p) {
        $in = $importMap[$p['id']] ?? 0;
        $out = $exportMap[$p['id']] ?? 0;
        $p['quantity'] = max(0, $in - $out);
    }

    echo json_encode([
        'success' => true,
        'data' => $products
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>