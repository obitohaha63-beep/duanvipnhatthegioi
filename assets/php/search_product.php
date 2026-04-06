<?php
header("Content-Type: application/json");
require "db.php";

$keyword = trim($_GET['keyword'] ?? '');
$page = intval($_GET['page'] ?? 1);
$limit = 6; // Số sản phẩm trên 1 trang
$price = $_GET['price'] ?? '';
$sort = $_GET['sort'] ?? '';
$offset = ($page - 1) * $limit; // Tính toán vị trí bắt đầu lấy dữ liệu

$where = ["p.status = 'visible'"];
$params = [];

// Xử lý tìm kiếm theo từ khóa
if (!empty($keyword)) {
    // Tìm trong tên sản phẩm, thương hiệu hoặc tên danh mục
    $where[] = "(p.name LIKE :kw OR p.brand LIKE :kw OR c.name LIKE :kw)";
    $params[":kw"] = "%$keyword%";
}

// Xử lý lọc theo khoảng giá
$priceConditions = [];
if (!empty($price)) {
    $priceArr = explode(',', $price);
    foreach ($priceArr as $p) {
        // Tính giá bán thật để so sánh
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

// Nối các điều kiện lại với nhau bằng chữ AND
$whereClause = "WHERE " . implode(" AND ", $where);

// CÂU LỆNH ĐẾM SỐ LƯỢNG SẢN PHẨM (Để làm phân trang)
$countSql = "SELECT COUNT(*) FROM products p JOIN categories c ON p.category_id = c.id $whereClause";

// CÂU LỆNH LẤY DỮ LIỆU SẢN PHẨM
$sql = "SELECT p.*, c.name AS category_name, (p.cost_price * (1 + p.profit_rate/100)) AS selling_price 
        FROM products p JOIN categories c ON p.category_id = c.id $whereClause";

// Xử lý sắp xếp (ORDER BY)
if ($sort == "tangdan") {
    $sql .= " ORDER BY selling_price ASC";
} elseif ($sort == "giamdan") {
    $sql .= " ORDER BY selling_price DESC";
} elseif ($sort == "moinhat") {
    $sql .= " ORDER BY p.created_at DESC";
} else {
    $sql .= " ORDER BY p.id DESC"; // Mặc định hiển thị mới nhất
}

// 1. Chạy lệnh đếm tổng số
$stmtCount = $conn->prepare($countSql);
foreach ($params as $key => $val) {
    $stmtCount->bindValue($key, $val);
}
$stmtCount->execute();
$totalItems = $stmtCount->fetchColumn();

// 2. Chạy lệnh lấy dữ liệu có giới hạn Limit / Offset
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