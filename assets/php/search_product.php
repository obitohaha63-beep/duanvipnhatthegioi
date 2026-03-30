<?php
header("Content-Type: application/json");
require "db.php";

$keyword = $_GET['keyword'] ?? '';
$page = intval($_GET['page'] ?? 1);
$limit = 6;
$price = $_GET['price'] ?? '';
$weight = $_GET['weight'] ?? '';
$sort = $_GET['sort'] ?? '';
$offset = ($page - 1) * $limit;

$keyword = trim($keyword);

// 🔥 tách từ khóa thành mảng
$keywords = array_filter(explode(' ', $keyword));

// 🔥 query chính
$sql = "SELECT p.*, c.name AS category_name,
        (p.cost_price * (1 + p.profit_rate/100)) AS selling_price
        FROM products p
        JOIN categories c ON p.category_id = c.id
        WHERE p.status = 'visible'";

$countSql = "SELECT COUNT(*) FROM products p
             JOIN categories c ON p.category_id = c.id
             WHERE p.status = 'visible'";

$params = [];

if (!empty($keywords)) {
    // 🔥 dùng AND giữa các từ khóa
    foreach ($keywords as $i => $kw) {
        $sql .= " AND (p.name LIKE :kw$i OR p.brand LIKE :kw$i OR c.name LIKE :kw$i)";
        $countSql .= " AND (p.name LIKE :kw$i OR p.brand LIKE :kw$i OR c.name LIKE :kw$i)";
        $params[":kw$i"] = "%$kw%";
    }
}

// 🔥 sắp xếp theo brand ưu tiên nếu có từ khóa cuối
if ($sort == "tangdan") {
    $sql .= " ORDER BY selling_price ASC";
} elseif ($sort == "giamdan") {
    $sql .= " ORDER BY selling_price DESC";
} elseif ($sort == "moinhat") {
    $sql .= " ORDER BY p.created_at DESC";
} else {
    $sql .= " ORDER BY p.id DESC";
}
$params[':brand'] = !empty($keywords) ? $keywords[count($keywords)-1] . "%" : "";

// 🔥 đếm tổng
$stmt = $conn->prepare($countSql);
$stmt->execute($params);
$totalItems = $stmt->fetchColumn();

// 🔥 phân trang
$sql .= " LIMIT :offset, :limit";
$stmt = $conn->prepare($sql);

// bind params
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

// 🔥 trả JSON
echo json_encode([
    "data" => $data,
    "pagination" => [
        "total_items" => $totalItems,
        "total_pages" => ceil($totalItems / $limit),
        "current_page" => $page
    ]
]);

if (!empty($price)) {
    $priceArr = explode(',', $price);

    $priceConditions = [];

    foreach ($priceArr as $index => $p) {

        if ($p == "500k-1tr") {
            $priceConditions[] = "(p.cost_price * (1 + p.profit_rate/100)) BETWEEN 500000 AND 1000000";
        }

        if ($p == "1-2tr") {
            $priceConditions[] = "(p.cost_price * (1 + p.profit_rate/100)) BETWEEN 1000000 AND 2000000";
        }

        if ($p == "2-3tr") {
            $priceConditions[] = "(p.cost_price * (1 + p.profit_rate/100)) BETWEEN 2000000 AND 3000000";
        }

        if ($p == ">3tr") {
            $priceConditions[] = "(p.cost_price * (1 + p.profit_rate/100)) > 3000000";
        }
    }

    if (!empty($priceConditions)) {
        $sql .= " AND (" . implode(" OR ", $priceConditions) . ")";
        $countSql .= " AND (" . implode(" OR ", $priceConditions) . ")";
    }
}

if (!empty($weight)) {
    $weightArr = explode(',', $weight);

    $placeholders = [];

    foreach ($weightArr as $i => $w) {
        $key = ":w$i";
        $placeholders[] = $key;
        $params[$key] = $w;
    }

    $sql .= " AND p.size IN (" . implode(",", $placeholders) . ")";
    $countSql .= " AND p.size IN (" . implode(",", $placeholders) . ")";
}
?>