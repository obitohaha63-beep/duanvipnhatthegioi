<?php
header("Content-Type: application/json");
require "db.php";

$keyword = $_GET['keyword'] ?? '';
$page = intval($_GET['page'] ?? 1);
$limit = 6;
$offset = ($page - 1) * $limit;

$keyword = trim($keyword);

// 🔥 query chính
$sql = "SELECT p.*, c.name AS category_name,
        (p.cost_price * (1 + p.profit_rate/100)) AS selling_price
        FROM products p
        JOIN categories c ON p.category_id = c.id
        WHERE p.status = 'visible'";

$params = [];

if ($keyword !== '') {
    $sql .= " AND (
        p.name LIKE :kw OR
        c.name LIKE :kw OR
        p.brand LIKE :kw
    )";
    $params[':kw'] = "%$keyword%";
}

// 🔥 đếm tổng
$countSql = "SELECT COUNT(*) FROM products p
             JOIN categories c ON p.category_id = c.id
             WHERE p.status = 'visible'";

if ($keyword !== '') {
    $countSql .= " AND (
        p.name LIKE :kw OR
        c.name LIKE :kw OR
        p.brand LIKE :kw
    )";
}

$stmt = $conn->prepare($countSql);
$stmt->execute($params);
$totalItems = $stmt->fetchColumn();

// 🔥 phân trang
$sql .= " LIMIT :offset, :limit";
$stmt = $conn->prepare($sql);

// bind params
if ($keyword !== '') {
    $stmt->bindValue(':kw', "%$keyword%");
}
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);

$stmt->execute();

$data = [];

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $data[] = [
        "id" => $row["id"],
        "name" => $row["name"],
        "image" => "../assets/images/" . $row["image_url"],
        "color" => $row["color"],
        "selling_price" => $row["selling_price"],
        "product_code" => $row["id"]
    ];
}

// 🔥 trả JSON
echo json_encode([
    "data" => $data,
    "pagination" => [
        "total_items" => $totalItems,
        "total_pages" => ceil($totalItems / $limit),
        "current_page" => $page
    ]
]);