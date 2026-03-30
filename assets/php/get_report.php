<?php
header('Content-Type: application/json; charset=utf-8');
include 'db.php';

$keyword = $_GET['keyword'] ?? '';
$from = $_GET['from'] ?? '';
$to = $_GET['to'] ?? '';

try {
    $fromDate = $from ? $from . " 00:00:00" : '';
    $toDate = $to ? $to . " 23:59:59" : '';

    // 1. Lấy danh sách sản phẩm lọc theo từ khóa
    $sql = "SELECT id, name FROM products WHERE 1=1";
    $params = [];
    if ($keyword !== '') {
        $sql .= " AND name LIKE ?";
        $params[] = "%$keyword%";
    }
    $stmt = $conn->prepare($sql);
    $stmt->execute($params);
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $result = [];

    foreach ($products as $p) {
        $id = $p['id'];

        // Tổng nhập
        $sqlImport = "SELECT SUM(poi.quantity) AS total_imported
                      FROM purchase_order_items poi
                      JOIN purchase_orders po ON poi.purchase_order_id = po.id
                      WHERE po.status = 'completed' AND poi.product_id = ?";
        $paramsImport = [$id];
        if ($fromDate !== '') $sqlImport .= " AND po.order_date >= ?";
        if ($toDate !== '') $sqlImport .= " AND po.order_date <= ?";
        if ($fromDate !== '' && $toDate !== '') $paramsImport[] = $fromDate;
        if ($fromDate !== '' && $toDate !== '') $paramsImport[] = $toDate;

        $stmtImport = $conn->prepare($sqlImport);
        $stmtImport->execute(array_merge([$id], array_slice($paramsImport,1)));
        $imported = (int)$stmtImport->fetchColumn();

        // Tổng xuất (chỉ confirmed)
        $sqlExport = "SELECT SUM(oi.quantity) AS total_exported
                      FROM order_items oi
                      JOIN orders o ON oi.order_id = o.id
                      WHERE o.status = 'confirmed' AND oi.product_id = ?";
        $paramsExport = [$id];
        if ($fromDate !== '') $sqlExport .= " AND o.order_date >= ?";
        if ($toDate !== '') $sqlExport .= " AND o.order_date <= ?";
        if ($fromDate !== '' && $toDate !== '') $paramsExport[] = $fromDate;
        if ($fromDate !== '' && $toDate !== '') $paramsExport[] = $toDate;

        $stmtExport = $conn->prepare($sqlExport);
        $stmtExport->execute(array_merge([$id], array_slice($paramsExport,1)));
        $exported = (int)$stmtExport->fetchColumn();

        $result[] = [
            'id' => $id,
            'name' => $p['name'],
            'imported' => $imported,
            'exported' => $exported
        ];
    }

    echo json_encode([
        'success' => true,
        'data' => $result
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>