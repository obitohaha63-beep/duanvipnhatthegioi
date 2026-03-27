<?php
header('Content-Type: application/json');
require 'db.php';

try {
    $keyword = $_GET['keyword'] ?? '';
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $limit = 9;

    $keyword = trim($keyword);

    if ($keyword === '') {
        echo json_encode([
            "status" => "success",
            "data" => [],
            "pagination" => [
                "current_page" => 1,
                "total_pages" => 0,
                "total_items" => 0
            ]
        ]);
        exit;
    }

    $offset = ($page - 1) * $limit;

    // 🔥 Đếm tổng sản phẩm
    $stmtCount = $conn->prepare("
        SELECT COUNT(DISTINCT p.id) as total
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.name LIKE :keyword
           OR c.name LIKE :keyword
    ");
    $stmtCount->execute([
        ':keyword' => '%' . $keyword . '%'
    ]);
    $totalItems = $stmtCount->fetch(PDO::FETCH_ASSOC)['total'];
    $totalPages = ceil($totalItems / $limit);

    // 🔥 Lấy sản phẩm theo trang
    $stmt = $conn->prepare("
        SELECT 
            p.id,
            p.name,
            p.cost_price,
            p.profit_percent,
            c.name AS category_name,
            pi.image_url
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN product_images pi ON pi.product_id = p.id
        WHERE p.name LIKE :keyword
           OR c.name LIKE :keyword
        GROUP BY p.id
        ORDER BY p.id DESC
        LIMIT :limit OFFSET :offset
    ");

    $stmt->bindValue(':keyword', '%' . $keyword . '%', PDO::PARAM_STR);
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();

    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $final = [];

    foreach ($products as $p) {
        $selling_price = $p['cost_price'] + ($p['cost_price'] * $p['profit_percent'] / 100);

        $final[] = [
            "product_code" => $p['id'],
            "name" => $p['name'],
            "image" => $p['image_url'] ?? '../assets/img/default.png',
            "selling_price" => $selling_price,
            "color" => $p['category_name'] ?? 'N/A'
        ];
    }

    echo json_encode([
        "status" => "success",
        "data" => $final,
        "pagination" => [
            "current_page" => $page,
            "total_pages" => $totalPages,
            "total_items" => $totalItems
        ]
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?>