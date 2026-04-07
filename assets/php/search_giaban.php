<?php
header('Content-Type: application/json; charset=utf-8');
include __DIR__ . '/db.php';


$gia_von = $_GET['gia_von'] ?? '';
$loi_nhuan = $_GET['loi_nhuan'] ?? '';
$gia_ban = $_GET['gia_ban'] ?? '';
$loai = $_GET['loai'] ?? '';

$sql = "SELECT p.id, p.name, p.cost_price, p.profit_rate,
        ROUND(p.cost_price * (1 + p.profit_rate / 100)) AS selling_price,
        c.name AS category_name
        FROM products p
        JOIN categories c ON p.category_id = c.id
        WHERE p.status='visible'";


$conds = [];
$params = [];

if($gia_von !== '') {
    $conds[] = "p.cost_price = ?";
    $params[] = $gia_von;
}
if($loi_nhuan !== '') {
    $conds[] = "p.profit_rate = ?";
    $params[] = $loi_nhuan;
}
if($gia_ban !== '') {
    $conds[] = "ROUND(p.cost_price * (1 + p.profit_rate / 100)) = ?";
    $params[] = $gia_ban;
}
if($loai !== '') {
    $conds[] = "c.name LIKE ?";
    $params[] = "%$loai%";
}

if(count($conds) > 0){
    $sql .= " AND " . implode(" AND ", $conds);
}

$stmt = $conn->prepare($sql);


if(count($params) > 0){
    $types = str_repeat("s", count($params));
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$result = $stmt->get_result();
$data = [];
while ($row = $result->fetch_assoc()){
    $data[] = $row;
}

echo json_encode($data, JSON_UNESCAPED_UNICODE);