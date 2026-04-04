<?php
header("Content-Type: application/json");
require "db.php";

$keyword = trim($_GET['keyword'] ?? '');
$page = intval($_GET['page'] ?? 1);
$limit = 6;
$price = $_GET['price'] ?? '';
$weight = $_GET['weight'] ?? '';
$sort = $_GET['sort'] ?? '';
$offset = ($page - 1) * $limit;

$keywords = array_filter(explode(' ', $keyword));

// Mảng chứa các điều kiện WHERE
$where = ["p.status = 'visible'"];
$params = [];

// 1. Xử lý keyword
if (!empty($keywords)) {
    $kwConditions = [];
    foreach ($keywords as $i => $kw) {
        $kwConditions[] = "(p.name LIKE :kw$i OR p.brand LIKE :kw$i OR c.name LIKE :kw$i)";
        $params[":kw$i"] = "%$kw%";
    }
    $where[] = "(" . implode(" AND ", $kwConditions) . ")";
}

// 2. Xử lý price (THÊM VÀO TRƯỚC KHI BUILD SQL)
$priceConditions = [];
if (!empty($price)) {
    $priceArr = explode(',', $price);
    foreach ($priceArr as $p) {
        if ($p == "500k-1tr") {
            $priceConditions[] = "(p.cost_price * (1 + p.profit_rate/100)) BETWEEN 500000 AND 1000000";
        } elseif ($p == "1-2tr") {
            $priceConditions[] = "(p.cost_price * (1 + p.profit_rate/100)) BETWEEN 1000000 AND 2000000";
        } elseif ($p == "2-3tr") {
            $priceConditions[] = "(p.cost_price * (1 + p.profit_rate/100)) BETWEEN 2000000 AND 3000000";
        } elseif ($p == ">3tr") {
            $priceConditions[] = "(p.cost_price * (1 + p.profit_rate/100)) > 3000000";
        }
    }
    if (!empty($priceConditions)) {
        $where[] = "(" . implode(" OR ", $priceConditions) . ")";
    }
}

// 3. Xử lý weight (size)
if (!empty($weight)) {
    $weightArr = explode(',', $weight);
    $weightConditions = [];
    foreach ($weightArr as $i => $w) {
        // Không phân biệt chữ hoa/thường, dùng UPPER
        $key = ":w$i";
        $weightConditions[] = "FIND_IN_SET(UPPER($key), UPPER(p.size)) > 0";
        $params[$key] = $w;
    }
    $where[] = "(" . implode(" OR ", $weightConditions) . ")";
}

// Xây dựng WHERE clause hoàn chỉnh
$whereClause = "WHERE " . implode(" AND ", $where);

// Câu lệnh đếm và lấy dữ liệu
$countSql = "SELECT COUNT(*) FROM products p
             JOIN categories c ON p.category_id = c.id
             $whereClause";

$sql = "SELECT p.*, c.name AS category_name,
        (p.cost_price * (1 + p.profit_rate/100)) AS selling_price
        FROM products p
        JOIN categories c ON p.category_id = c.id
        $whereClause";

// 4. Xử lý sắp xếp
if ($sort == "tangdan") {
    $sql .= " ORDER BY selling_price ASC";
} elseif ($sort == "giamdan") {
    $sql .= " ORDER BY selling_price DESC";
} elseif ($sort == "moinhat") {
    $sql .= " ORDER BY p.created_at DESC";
} else {
    $sql .= " ORDER BY p.id DESC";
}

// Đếm tổng số sản phẩm (có áp dụng bộ lọc)
$stmt = $conn->prepare($countSql);
foreach ($params as $key => $val) {
    $stmt->bindValue($key, $val);
}
$stmt->execute();
$totalItems = $stmt->fetchColumn();

// Phân trang
$sql .= " LIMIT :offset, :limit";
$stmt = $conn->prepare($sql);
foreach ($params as $key => $val) {
    $stmt->bindValue($key, $val);
}
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
$stmt->execute();

$data = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $data[] = [
        "id" => $row["id"],
        "name" => $row["name"],
        "image" => "../" . $row["image_url"],
        "color" => $row["color"],
        "selling_price" => $row["selling_price"],
        "product_code" => $row["id"]
    ];
}

echo json_encode([
    "data" => $data,
    "pagination" => [
        "total_items" => $totalItems,
        "total_pages" => ceil($totalItems / $limit),
        "current_page" => $page
    ]
]);
?>