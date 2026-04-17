<?php
header('Content-Type: application/json; charset=utf-8');
include 'db.php';

// Nhận tham số từ JS loadReport()
$keyword = $_GET['keyword'] ?? '';
$from = $_GET['from'] ?? '';
$to = $_GET['to'] ?? '';

try {
    //  Lọc sản phẩm theo keyword
    $sql = "SELECT id, name FROM products WHERE 1=1";
    $params = [];
    if ($keyword !== '') {
        $sql .= " AND name LIKE ?";
        $params[] = "%$keyword%";
    }
    $stmt = $conn->prepare($sql);
    $stmt->execute($params);
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Tính tổng NHẬP trong khoảng thời gian
    $sqlImport = "SELECT poi.product_id, SUM(poi.quantity) AS total_imported
                  FROM purchase_order_items poi
                  JOIN purchase_orders po ON poi.purchase_order_id = po.id
                  WHERE po.status = 'completed'";
    $paramsImport = [];
    if ($from !== '') {
        $sqlImport .= " AND po.order_date >= ?";
        $paramsImport[] = $from . ' 00:00:00';
    }
    if ($to !== '') {
        $sqlImport .= " AND po.order_date <= ?";
        $paramsImport[] = $to . ' 23:59:59';
    }
    $sqlImport .= " GROUP BY poi.product_id";
    $stmtImport = $conn->prepare($sqlImport);
    $stmtImport->execute($paramsImport);

    $importMap = [];
    foreach ($stmtImport->fetchAll(PDO::FETCH_ASSOC) as $imp) {
        $importMap[$imp['product_id']] = (int)$imp['total_imported'];
    }

    //Tính tổng XUẤT trong khoảng thời gian
    $sqlExport = "SELECT oi.product_id, SUM(oi.quantity) AS total_exported
                  FROM order_items oi
                  JOIN orders o ON oi.order_id = o.id
                  WHERE o.status = 'delivered'";
    $paramsExport = [];
    if ($from !== '') {
        $sqlExport .= " AND o.order_date >= ?";
        $paramsExport[] = $from . ' 00:00:00';
    }
    if ($to !== '') {
        $sqlExport .= " AND o.order_date <= ?";
        $paramsExport[] = $to . ' 23:59:59';
    }
    $sqlExport .= " GROUP BY oi.product_id";
    $stmtExport = $conn->prepare($sqlExport);
    $stmtExport->execute($paramsExport);

    $exportMap = [];
    foreach ($stmtExport->fetchAll(PDO::FETCH_ASSOC) as $exp) {
        $exportMap[$exp['product_id']] = (int)$exp['total_exported'];
    }

    //  Map dữ liệu đúng với tên biến JS yêu cầu (imported, exported)
    $reportData = [];
    foreach ($products as $p) {
        $in = $importMap[$p['id']] ?? 0;
        $out = $exportMap[$p['id']] ?? 0;

        if ($in > 0 || $out > 0) {
            $reportData[] = [
                'id' => $p['id'],
                'name' => $p['name'],
                'imported' => $in,
                'exported' => $out
            ];
        }
    }

    echo json_encode([
        'success' => true,
        'data' => $reportData
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
