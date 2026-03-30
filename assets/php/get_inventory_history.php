<?php
include 'db.php';

$keyword = $_GET['keyword'] ?? '';
$from = $_GET['from'] ?? '';
$to = $_GET['to'] ?? '';

$sql = "SELECT p.id, p.name,
       SUM(CASE WHEN ih.transaction_type='import' THEN ih.change_quantity ELSE 0 END) AS total_in,
       SUM(CASE WHEN ih.transaction_type='export' THEN ih.change_quantity ELSE 0 END) AS total_out
       FROM products p
       LEFT JOIN inventory_history ih 
           ON ih.product_id = p.id ";

$where = [];
$params = [];

if($from && $to){
    $where[] = "DATE(ih.created_at) BETWEEN ? AND ?";
    $params[] = $from;
    $params[] = $to;
}

if($keyword){
    $where[] = "p.name LIKE ?";
    $params[] = "%$keyword%";
}

if($where){
    $sql .= " WHERE " . implode(' AND ', $where);
}

$sql .= " GROUP BY p.id";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);