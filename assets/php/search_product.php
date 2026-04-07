<?php
header("Content-Type: application/json");
require "db.php";

$keyword = trim($_GET['keyword'] ?? '');
$page = intval($_GET['page'] ?? 1);
$limit = 6;
$price = $_GET['price'] ?? '';
$brand_filter = $_GET['brand'] ?? '';
$category_filter = $_GET['category'] ?? '';  // Thêm category parameter
$sort = $_GET['sort'] ?? '';
$offset = ($page - 1) * $limit;

$where = ["p.status = 'visible'"];
$params = [];


if (!empty($keyword)) {
    $where[] = "(p.name LIKE :kw OR p.brand LIKE :kw OR c.name LIKE :kw)";
    $params[":kw"] = "%$keyword%";
}


if (!empty($price)) {
    $priceArr = explode(',', $price);
    $priceConditions = [];
    foreach ($priceArr as $p) {
        $formula = "(p.cost_price * (1 + p.profit_rate/100))";
        if ($p == "500k-1tr") $priceConditions[] = "$formula BETWEEN 500000 AND 1000000";
        elseif ($p == "1-2tr") $priceConditions[] = "$formula BETWEEN 1000000 AND 2000000";
        elseif ($p == "2-3tr") $priceConditions[] = "$formula BETWEEN 2000000 AND 3000000";
        elseif ($p == ">3tr")  $priceConditions[] = "$formula > 3000000";
    }
    if (!empty($priceConditions)) {
        $where[] = "(" . implode(" OR ", $priceConditions) . ")";
    }
}


if (!empty($brand_filter)) {
    $brands = explode(',', $brand_filter);
    
    $brandPlaceholders = [];
    foreach ($brands as $index => $brandName) {
        $key = ":brand" . $index;
        $brandPlaceholders[] = $key;
        $params[$key] = $brandName;
    }
    $where[] = "p.brand IN (" . implode(",", $brandPlaceholders) . ")";
}

// Xử lý category filter
if (!empty($category_filter)) {
    $categories = explode(',', $category_filter);
    
    $categoryPlaceholders = [];
    foreach ($categories as $index => $categoryName) {
        $key = ":category" . $index;
        $categoryPlaceholders[] = $key;
        $params[$key] = $categoryName;
    }
    $where[] = "c.name IN (" . implode(",", $categoryPlaceholders) . ")";
}

$whereClause = "WHERE " . implode(" AND ", $where);




$countSql = "SELECT COUNT(*) FROM products p JOIN categories c ON p.category_id = c.id $whereClause";
$stmtCount = $conn->prepare($countSql);
foreach ($params as $key => $val) {
    $stmtCount->bindValue($key, $val);
}
$stmtCount->execute();
$totalItems = $stmtCount->fetchColumn();


$sql = "SELECT p.*, c.name AS category_name, (p.cost_price * (1 + p.profit_rate/100)) AS selling_price 
        FROM products p JOIN categories c ON p.category_id = c.id $whereClause";


if ($sort == "tangdan") $sql .= " ORDER BY selling_price ASC";
elseif ($sort == "giamdan") $sql .= " ORDER BY selling_price DESC";
elseif ($sort == "moinhat") $sql .= " ORDER BY p.created_at DESC";
else $sql .= " ORDER BY p.id DESC";


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
        "selling_price" => $row["selling_price"]
    ];
}

echo json_encode([
    "data" => $data,
    "pagination" => [
        "total_items" => (int)$totalItems,
        "total_pages" => ceil($totalItems / $limit),
        "current_page" => $page
    ]
]);
?>